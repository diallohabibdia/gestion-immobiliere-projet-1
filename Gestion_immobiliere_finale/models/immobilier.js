
// Connexion a la base de donnees
import database from "../config/database.js";
// Les types de donnees
import { DataTypes } from "sequelize";

// Définition du modèle Immobilier
const Immobilier = database.define('Immobilier', {
  ville:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  localisationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pays:{
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
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
},
  // Ajoutez d'autres champs nécessaires ici
});

// Exportation du modèle immobilier
export default Immobilier
await Immobilier.sync({ alter: true });  // alter met à jour la table si elle existe déjà