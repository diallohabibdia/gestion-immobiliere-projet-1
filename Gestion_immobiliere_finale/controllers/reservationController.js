import { Immobilier } from '../models/relation.js'
import { Client } from '../models/relation.js'
import { Reservation } from '../models/relation.js'
import { Op } from 'sequelize';

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
  try {
    const { clientId, immobilierId, dateDebut, dateFin, montant, statut } = req.body;

    // Vérification de l'existence du client et du bien immobilier
    const client = await Client.findByPk(clientId);
    const bienImmobilier = await Immobilier.findByPk(immobilierId);

    if (!client || !bienImmobilier) {
      return res.status(404).json({ message: 'Client ou bien immobilier non trouvé' });
    }

    // Vérification des dates
    if (!dateDebut || !dateFin) {
      return res.status(400).json({ error: "Les champs 'dateDebut' et 'dateFin' sont obligatoires au format aaaa-mm-dd." });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateDebut) || !dateRegex.test(dateFin)) {
      return res.status(400).json({ error: "Les dates doivent être au format 'aaaa-mm-dd'." });
    }

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const today = new Date();

    // Vérification de la logique des dates
    if (debut > fin) {
      return res.status(400).json({ error: "La date de début doit être antérieure à la date de fin." });
    }

    // Vérification de la disponibilité du bien immobilier pour les dates spécifiées
    const existingReservation = await Reservation.findOne({
      where: {
        immobilierId,
        statut: { [Op.not]: 'Annulée' }, // Exclure les réservations annulées
        [Op.or]: [
          { dateDebut: { [Op.between]: [debut, fin] } }, // La date de début se situe entre la période
          { dateFin: { [Op.between]: [debut, fin] } }, // La date de fin se situe entre la période
          { [Op.and]: [
            { dateDebut: { [Op.lte]: debut } },
            { dateFin: { [Op.gte]: fin } }
          ]} // La période de réservation englobe entièrement la période demandée
        ]
      }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Ce bien immobilier est déjà réservé pour les dates demandées.' });
    }

    // Logique pour déterminer le statut de la réservation en fonction de la date actuelle
    let newStatut = statut || 'En attente'; // Valeur par défaut du statut

    if (fin < today) {
      newStatut = 'Réservation validée (et terminée)  - Bien déjà disponible';
    } else if (debut <= today && fin >= today) {
      newStatut = 'Réservation en cours - Bien indisponible';
    } else if (debut > today) {
      newStatut = 'En attente';
    }

    // Créer la réservation avec le statut déterminé
    const reservation = await Reservation.create({
      clientId,
      immobilierId,
      dateDebut,
      dateFin,
      montant,
      statut: newStatut, // Utilisation du statut calculé
    });

    res.status(201).json(reservation);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


// Récupérer toutes les réservations
// Récupérer toutes les réservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Client,
          //as: 'client', // Assurez-vous que l'alias correspond à votre définition de relation
        },
        {
          model: Immobilier,
          //as: 'immobilier', // Assurez-vous que l'alias correspond à votre définition de relation
        },
      ],
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Récupérer une réservation par ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('client')
      .populate('bienImmobilier');

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { statut } = req.body;
    const { id } = req.params;

    // Récupérer la réservation par son ID
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    const today = new Date();
    const dateFin = new Date(reservation.dateFin); // Convertir la date de fin de la réservation en objet Date

    // Vérifier si la date de fin est dans le futur
    if (dateFin <= today) {
      return res.status(400).json({ message: "La réservation ne peut être mise à jour car la date de fin est passée." });
    }

    // Si la date de fin est dans le futur, mettre à jour le statut
    const updatedReservation = await reservation.update(
      { statut },
      { returning: true } // Retourner la réservation mise à jour
    );

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Supprimer une réservation
// Supprimer une réservation seulement si le statut est "En attente"
export const deleteReservation = async (req, res) => {
  try {
    // Récupérer la réservation par son ID
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    // Vérifier si le statut de la réservation est "En attente"
    if (reservation.statut !== 'En attente') {
      return res.status(400).json({ message: 'La réservation ne peut être supprimée que si son statut est "En attente".' });
    }

    // Si le statut est "En attente", procéder à la suppression
    await reservation.destroy();

    res.status(204).send(); // Réponse sans contenu (suppression réussie)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};