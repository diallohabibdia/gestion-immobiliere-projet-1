// routes/equipementRoutes.js
import {Router} from "express";

import { getAllEquipements, getEquipementById, createEquipement, updateEquipement, deleteEquipement } from "../controllers/equipementController.js";
const equipementRoute = Router();

// Définir les routes pour les paiements
equipementRoute.get('/', getAllEquipements)
                .post('/', createEquipement)
                .get('/:id', getEquipementById)
                .put('/', updateEquipement)
                .delete('/', deleteEquipement)


export default equipementRoute

