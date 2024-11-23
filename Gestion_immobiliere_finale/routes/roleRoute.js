//Importer la fonction Router pour la creation des routes
import { Router } from "express";


//Importer les controllers
import { addRole, deleteRole, roleList } from "../controllers/roleController.js";

// Creation d"une instance de Router
const roleRoute = Router()

roleRoute.get('/', roleList)
    .post('/', addRole)
    .delete('/:id', deleteRole)

export default roleRoute