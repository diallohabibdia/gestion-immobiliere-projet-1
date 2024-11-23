
// routes/reservationRoutes.js
import {Router} from "express";
import { addImmobilier, immobilierList, getAllImmobiliers, getImmobilierById, updateImmobilier,  deleteImmobilier} from "../controllers/immobilierController.js";
  const immobilierRoute = Router();

immobilierRoute.get('/', immobilierList)
                .post('/', addImmobilier)
                .get('/', getAllImmobiliers)
                .get('/:id', getImmobilierById)
                .put('/', updateImmobilier)
                .delete('/', deleteImmobilier)


export default immobilierRoute
 

// Définir les routes
//router.get('/', bienImmobilierController.getAllBiensImmobiliers);   // Récupérer tous les biens immobiliers
//router.post('/', bienImmobilierController.createBienImmobilier);    // Créer un nouveau bien immobilier
//router.get('/:id', bienImmobilierController.getBienImmobilierById); // Récupérer un bien immobilier par ID
//router.put('/:id', bienImmobilierController.updateBienImmobilier);  // Mettre à jour un bien immobilier
//router.delete('/:id', bienImmobilierController.deleteBienImmobilier); // Supprimer un bien immobilier

//module.exports = router;
