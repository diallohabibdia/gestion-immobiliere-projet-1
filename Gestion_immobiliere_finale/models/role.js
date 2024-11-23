import database from "../config/database.js";
import { DataTypes } from "sequelize";

const Role = database.define('Role', {
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['Client', 'Employe', 'Admin']], // Liste des choix possibles
                msg: "La description doit être l'une des valeurs suivantes : 'Client', 'Employe', 'Administrateur'. "
                }    }
    }, 
    description: {
        type: DataTypes.TEXT,
        allowNull: true // Description ou spécificités du rôle (ex : "Médecin généraliste", "Cardiologue")
    }
    
}, {
    timestamps: false // Désactivation des horodatages par défaut
});
 
export default Role
await Role.sync({ alter: true });  // alter met à jour la table si elle existe déjà