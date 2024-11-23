import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Client from "../models/client.js";
import Immobilier from "./immobilier.js";
// Définition du modèle Reservation
const Reservation = database.define('Reservation', {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  immobilierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateDebut:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  montant:{
    type: DataTypes.INTEGER,
    allowNull:false
  }
});

// Exportation du modèle reservation clientId, immobilierId, dateDebut, dateFin, montant, statut
export default Reservation
// await Reservation.sync({ alter: true });  // alter met à jour la table si elle existe déjà