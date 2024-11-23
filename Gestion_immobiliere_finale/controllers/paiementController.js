
import { Paiement } from '../models/relation.js'

// Créer un nouveau paiement
export const createPaiement = async (req, res) => {
    try {
      const { mode_paiement, numero_compte_bancaire, nom_payeur, date } = req.body;
  
      // Créer un nouveau paiement
      const paiement = await Paiement.create({
        mode_paiement,
        numero_compte_bancaire,
        nom_payeur,
        date
      });
  
      res.status(201).json(paiement); // Retourner le paiement créé
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  
  // Récupérer tous les paiements
  export const getAllPaiements = async (req, res) => {
    try {
      const paiements = await Paiement.findAll();
      res.status(200).json(paiements); // Retourner tous les paiements
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Récupérer un paiement par ID
  export const getPaiementById = async (req, res) => {
    try {
      const paiement = await Paiement.findByPk(req.params.id);
  
      if (!paiement) {
        return res.status(404).json({ message: 'Paiement non trouvé' });
      }
  
      res.status(200).json(paiement); // Retourner le paiement trouvé
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Mettre à jour un paiement
  export const updatePaiement = async (req, res) => {
    try {
      const { mode_paiement, numero_compte_bancaire, nom_payeur, date } = req.body;
      const paiement = await Paiement.findByPk(req.params.id);
  
      if (!paiement) {
        return res.status(404).json({ message: 'Paiement non trouvé' });
      }
  
      // Mettre à jour les informations du paiement
      paiement.mode_paiement = mode_paiement || paiement.mode_paiement;
      paiement.numero_compte_bancaire = numero_compte_bancaire || paiement.numero_compte_bancaire;
      paiement.nom_payeur = nom_payeur || paiement.nom_payeur;
      paiement.date = date || paiement.date;
  
      await paiement.save();
  
      res.status(200).json(paiement); // Retourner le paiement mis à jour
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Supprimer un paiement
  export const deletePaiement = async (req, res) => {
    try {
      const paiement = await Paiement.findByPk(req.params.id);
  
      if (!paiement) {
        return res.status(404).json({ message: 'Paiement non trouvé' });
      }
  
      // Supprimer le paiement
      await paiement.destroy();
  
      res.status(204).send(); // 204 No Content pour indiquer la suppression
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };