// routes/localisationRoutes.js
import {Router} from "express";

import { getAllLocalisations, getLocalisationById, createLocalisation, deleteLocalisation, updateLocalisation } from "../controllers/localisationController.js";
const localisationRoute = Router();

// Définir les routes pour les paiements
localisationRoute.get('/', getAllLocalisations)
                .post('/', createLocalisation)
                .get('/:id', getLocalisationById)
                .put('/', updateLocalisation)
                .delete('/', deleteLocalisation)


export default localisationRoute
 
 