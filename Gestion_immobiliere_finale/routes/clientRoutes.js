// Importer la fonction qui permet de creer les routes
import { Router } from "express";
import { addUser, deleteUser, getUsers, profilUser, updateUser, updateRolesForClient, assignRoleToUser } from "../controllers/clientController.js";


//Importer la fonction pour charger les images/fichiers
import upload from "../enregistrements/fileloader.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autorisation.js";
//Creer une variable utilisant la fonction Router
const clientRoutes = Router()

//Creation des routes
clientRoutes

    .post('/', upload.single('image'), addUser)
    //Proteger toutes les routes ci-dessous
    .all("*",verifierToken) 
    .get('/:id', profilUser)
     .all("*",autoriser(["admin"])) 
     .get('/', getUsers)
     .patch('/:id', updateUser)
    .delete('/:id', deleteUser)
    .post('/assigner_role', assignRoleToUser)
    .post('/:id', updateRolesForClient); // Route pour attribuer un rôle à un utilisateur

export default clientRoutes

