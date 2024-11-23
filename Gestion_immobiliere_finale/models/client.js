
// Connexion a la base de donnees
import database from "../config/database.js";
// Les types de donnees
import { DataTypes } from "sequelize";
import Role from "./role.js";

// Définition du modèle Client
const Client = database.define('Client', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validation pour l'email
    },
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pays_residence:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  ville:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  boite_postale:{
    type: DataTypes.STRING,
  },
  contact_urgence:{
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  // Ajoutez d'autres champs nécessaires ici
}, {
  timestamps: true,  // Ajoute les champs createdAt et updatedAt
});

// Exportation du modèle Client
export default Client

// Synchroniser le modèle avec la base de données
//await Client.sync({ alter: true });  // alter met à jour la table si elle existe déjà