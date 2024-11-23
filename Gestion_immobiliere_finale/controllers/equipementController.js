import { Equipement } from "../models/relation.js";
// Créer un nouvel équipement
export const createEquipement = async (req, res) => {
  try {
    const { nom, dimensions, prix_en_dollar, type } = req.body;

    // Créer un nouvel équipement
    const equipement = await Equipement.create({
      nom,
      dimensions,
      prix_en_dollar,
      type
    });

    res.status(201).json(equipement); // Retourner l'équipement créé
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les équipements
export const getAllEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.findAll();
    res.status(200).json(equipements); // Retourner tous les équipements
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer un équipement par ID
export const getEquipementById = async (req, res) => {
  try {
    const equipement = await Equipement.findByPk(req.params.id);

    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    res.status(200).json(equipement); // Retourner l'équipement trouvé
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un équipement
export const updateEquipement = async (req, res) => {
  try {
    const { nom, dimensions, prix_en_dollar, type } = req.body;
    const equipement = await Equipement.findByPk(req.params.id);

    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    // Mettre à jour l'équipement
    equipement.nom = nom || equipement.nom;
    equipement.dimensions = dimensions || equipement.dimensions;
    equipement.prix_en_dollar = prix_en_dollar || equipement.prix_en_dollar;
    equipement.type = type || equipement.type;

    await equipement.save();

    res.status(200).json(equipement); // Retourner l'équipement mis à jour
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un équipement
export const deleteEquipement = async (req, res) => {
  try {
    const equipement = await Equipement.findByPk(req.params.id);

    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    // Supprimer l'équipement
    await equipement.destroy();

    res.status(204).send(); // 204 No Content pour indiquer la suppression
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};