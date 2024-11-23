// Connexion a la base de donnees
import database from "../config/database.js";
// Les types de donnees
import { DataTypes } from "sequelize";
import Immobilier from "./immobilier.js";

// Définition du modèle localisation
const Localisation = database.define('Localisation', {
  ville:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  pays:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  codePostal:{
    type: DataTypes.STRING,
    allowNull: false
  }
  });
  
  // Exportation du modèle localisation
  export default Localisation
  //await Localisation.sync({ alter: true });  // alter met à jour la table si elle existe déjà