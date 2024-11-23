
import Client from "./client.js";
import Equipement from "./equipement.js";
import Immobilier from "./immobilier.js";
import Paiement from "./paiement.js";
import Localisation from "./localisation.js";
import Reservation from "./reservation.js";
import Role  from "./role.js";

Role.belongsToMany(Client, {
    through: "role_user", // Nom de la table de jointure
    foreignKey: 'roleId', // Clé étrangère pour Role
    otherKey: 'clientId', // Clé étrangère pour Client
    as: 'clients', // Alias pour accéder aux clients depuis un rôle
  });
  
  Client.belongsToMany(Role, {
    through: "role_user", // Nom de la table de jointure
    foreignKey: 'clientId', // Clé étrangère pour Client
    otherKey: 'roleId', // Clé étrangère pour Role
    as: 'roles', // Alias pour accéder aux rôles depuis un client
  });

// relation entre reservation et immobilier
// une reservation peut concerner un ou plusieurs biens immobilier, un bien immobilier peut appartenir qu'à une seule reservation à la
Reservation.belongsTo(Immobilier, {
    foreignKey: 'immobilierId', // Clé étrangère dans Reservation
   // as: 'Immobilier_reservé' // Alias pour accéder aux reservations via le client
});

Immobilier.hasMany(Reservation, {
    foreignKey: 'immobilierId', // Clé étrangère dans Reservation
   // as: 'reservations' // Alias pour accéder aux reservations via le client
});
// relation entre client et reservation
// une reservation peut etre faite par un seul client
// un client peut faire une  ou plusieurs reservations

// Client.hasMany(Reservation)
Client.hasMany(Reservation, {
    foreignKey: 'clientId', // Clé étrangère dans Reservation
   // as: 'reservation_client' // Alias pour accéder aux reservations via le client
});

Reservation.belongsTo(Client, {
    foreignKey: 'clientId', // Clé étrangère dans Reservation
   // as: 'client' // Alias pour accéder aux reservations via le client
});


Equipement.belongsTo(Immobilier,{
    foreignKey: 'immobilierId', // Clé étrangère dans Equipement
   // as: 'equipements' // Alias
})
// relation immobilier equipement
//Immobilier.hasMany(Equipement)
Immobilier.hasMany(Equipement, {
    foreignKey: 'immobilierId', // Clé étrangère dans Equipement
   // as: 'equipements' // Alias pour accéder aux équipements via Immobilier
});

// relation immobilier / localisation
// un immobilier est situé dans une seule localisation, et une localisation peut avoir plusieurs biens immobiliers
// Immobilier.belongsTo(Localisation)
Immobilier.belongsTo(Localisation, {
    foreignKey: 'localisationId', // Clé étrangère dans Immobilier
   // as: 'localisation' // Alias pour accéder à la localisation depuis Immobilier
});

Localisation.hasMany(Immobilier, {
    foreignKey: 'localisationId', // Clé étrangère dans Immobilier
   // as: 'immobiliers' // Alias pour accéder aux biens immobiliers depuis Localisation
});

// relation Paiement et reservation
// un paiement peut regler une seule reservations
// une reservation peut etre reglée par un ou plusieurs paiements 
//Paiement.belongsToMany(Reservation)
Reservation.hasMany(Paiement, { foreignKey: "reservationId", as: "paiements" });
Paiement.belongsTo(Reservation, { foreignKey: "reservationId", as: "reservation" });

//Synchronisation des modèles avec la base de données si nécessaire


export {Client, Role, Immobilier, Paiement, Reservation, Equipement, Localisation }