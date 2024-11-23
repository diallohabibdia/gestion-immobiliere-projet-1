// routes/paiementRoutes.js

import {Router} from "express";
import { getAllPaiements, deletePaiement, getPaiementById, updatePaiement, createPaiement } from "../controllers/paiementController.js";
const paiementRoute = Router();

// Définir les routes pour les paiements
paiementRoute.get('/', getAllPaiements)
                .post('/', createPaiement)
                .get('/:id', getPaiementById)
                .put('/', updatePaiement)
                .delete('/', deletePaiement)


export default paiementRoute
 