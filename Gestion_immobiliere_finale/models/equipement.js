// Connexion a la base de donnees
import database from "../config/database.js";
// Les types de donnees
import { DataTypes } from "sequelize";

// Définition du modèle Equipement
const Equipement = database.define('Equipement', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix_en_dollar: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isIn: {
            args: [['Projeteur', 'Caméras', 'Fumigène', 'Ordinateur']], // Liste des choix possibles
            msg: "La description doit être l'une des valeurs suivantes : 'Projeteur', 'Caméras', 'Fumigène', 'Ordinateur'."
        }
  }
},
});
// Exportation du modèle equipement
export default Equipement
//await Equipement.sync({ alter: true });  // alter met à jour la table si elle existe déjà