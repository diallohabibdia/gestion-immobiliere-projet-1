import {Immobilier, Localisation} from '../models/relation.js'

//Liste
export const immobilierList = async (req, res) => {
    try {
        const immobiliers = await Immobilier.findAll()
        res.status(200).json({ data: immobiliers})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}
//creation
export const addImmobilier = async (req, res) => {
    const infoImmobilier = req.body
    console.log("req.body:", req.body); // Ajoutez cette ligne pour voir les données reçues
    try{
      
        // Vérification des données requises
        if (!infoImmobilier.Description || !infoImmobilier.ville || !infoImmobilier.pays || !infoImmobilier.adresse || !infoImmobilier.prix) {
          return res.status(400).json({ error: 'Description, ville, pays, adresse et prix sont obligatoires.' });
      }

      // Vérifier si la localisation correspond
      const localisation = await Localisation.findOne({
          where: {
              ville: infoImmobilier.ville,
              pays: infoImmobilier.pays,
          },
      });
      if (!localisation) {
        return res.status(400).json({ error: 'Localisation invalide : la ville et le pays ne correspondent pas.' });
    }

    // Associer l'immobilier à l'ID de la localisation trouvée
    const immobilierData = { 
        ...infoImmobilier, 
        localisationId: localisation.id 
    };
      
        const result = await Immobilier.create(immobilierData)
        res.status(201).json({ message: 'Immobilier ajouté', data: result})

    }catch (error){
      res.status(400).json({ message: error.message})
    }
}
// Récupérer tous les biens immobiliers
export const getAllImmobiliers = async (req, res) => {
    try {
      const biensImmobiliers = await Immobilier.find();
      res.status(200).json(biensImmobiliers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Récupérer un bien immobilier par ID
  export const getImmobilierById = async (req, res) => {
    try {
      const bienImmobilier = await Immobilier.findById(req.params.id);
      if (!bienImmobilier) {
        return res.status(404).json({ message: 'Bien immobilier non trouvé' });
      }
      res.status(200).json(bienImmobilier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Mettre à jour un bien immobilier
  export const updateImmobilier = async (req, res) => {
    try {
      const {ville,pays, adresse,boite_postale,Description, prix } = req.body;
  
      const bienImmobilier = await Immobilier.findByIdAndUpdate(
        req.params.id,
        {
            ville,pays, adresse,boite_postale,Description, prix
        },
        { new: true } // Retourne le document mis à jour
      );
  
      if (!bienImmobilier) {
        return res.status(404).json({ message: 'Bien immobilier non trouvé' });
      }
  
      res.status(200).json(bienImmobilier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Supprimer un bien immobilier
  export const deleteImmobilier = async (req, res) => {
    try {
      const bienImmobilier = await Immobilier.findByIdAndDelete(req.params.id);
      if (!bienImmobilier) {
        return res.status(404).json({ message: 'Bien immobilier non trouvé' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };