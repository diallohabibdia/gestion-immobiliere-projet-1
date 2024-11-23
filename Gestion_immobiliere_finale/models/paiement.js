import database from "../config/database.js";
import { DataTypes } from "sequelize";
// Définition du modèle Paiement
const Paiement = database.define('Paiement', {
  mode_paiement: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isIn: {
            args: [['Interac', 'Virement Bancaire', 'Orange Money/Mtn Money', 'Paiement en espèces']], // Liste des choix possibles
            msg: "La description doit être l'une des valeurs suivantes : 'Interac', 'virement bancaire', 'Orange Money/Mtn Money', ou 'Paiement en espèces'."
        }
  }
},
  numero_compte_bancaire: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nom_payeur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
 // Ajoutez d'autres champs nécessaires ici
}, {
    timestamps: true,  // Ajoute les champs createdAt et updatedAt
  });
// Exportation du modèle  paiement
export default Paiement
//await Paiement.sync({ alter: true });  // alter met à jour la table si elle existe déjà