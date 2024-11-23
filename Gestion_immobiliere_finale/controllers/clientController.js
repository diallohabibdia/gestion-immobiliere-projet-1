// Importations nécessaires
import bcrypt from 'bcryptjs';
import { Client, Role, Reservation } from '../models/relation.js';

// -----------------------------------------------------
// 1. Lecture : Liste des utilisateurs
// -----------------------------------------------------
export const getUsers = async (req, res) => {
  try {
    const users = await Client.findAll();
    console.log("Users:", users);
    res.status(200).json({ data: users });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// -----------------------------------------------------
// 2. Création : Ajouter un utilisateur
// -----------------------------------------------------
export const addUser = async (req, res) => {
  const { mot_de_passe, ...restInfoClient } = req.body;

  try {
    // Validation des données d'entrée
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.identification) {
      return res.status(400).json({ error: "Nom, prénom, email et identification sont obligatoires." });
    }
    if (!/\S+@\S+\.\S+/.test(req.body.email)) {
      return res.status(400).json({ error: "L'email fourni n'est pas valide." });
    }

    // Hachage du mot de passe
    const mdpHache = bcrypt.hashSync(mot_de_passe);
    const newUser = { mot_de_passe: mdpHache, ...restInfoClient };

    // Création du client
    const result = await Client.create(newUser);

    // Assigner un rôle par défaut si spécifié
    if (req.body.roleId) {
      const role = await Role.findByPk(req.body.roleId);
      if (role) {
        await result.addRole(role); // Assigner le rôle au nouvel utilisateur
      }
    }

    res.status(201).json({ message: "Utilisateur créé avec succès", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------------------
// 3. Mise à jour : Modifier un utilisateur
// -----------------------------------------------------
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  try {
    const [updatedRows] = await Client.update(newInfo, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur mis à jour avec succès", updatedRows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------------------
// 4. Suppression : Supprimer un utilisateur
// -----------------------------------------------------
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Client.destroy({ where: { id } });
    res.status(200).json({ message: "Utilisateur supprimé avec succès", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------------------
// 5. Profil : Voir le profil d'un utilisateur
// -----------------------------------------------------
export const profilUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Client.findByPk(id, {
      include: [
        { model: Role, as: "roles" },
        { model: Reservation, as: "Reservations" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------------------
// 6. Gestion des rôles : Ajouter un rôle à un utilisateur
// -----------------------------------------------------
export const assignRoleToUser = async (req, res) => {
  try {
    const { clientId, roleId } = req.body;

    const user = await Client.findByPk(clientId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "Utilisateur ou rôle non trouvé." });
    }

    await user.addRole(role); // Associer le rôle à l'utilisateur
    res.status(200).json({ message: "Rôle attribué avec succès.", user, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------
// 7. Mise à jour des rôles d'un utilisateur
// -----------------------------------------------------
export const updateRolesForClient = async (req, res) => {
  try {
    const { clientId, roleIds } = req.body;

    if (!Array.isArray(roleIds) || roleIds.length === 0) {
      return res.status(400).json({ message: "roleIds doit être un tableau non vide." });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    const roles = await Role.findAll({ where: { id: roleIds } });
    if (roles.length === 0) {
      return res.status(404).json({ message: "Aucun rôle valide trouvé" });
    }

    await client.setRoles(roles); // Remplace les anciens rôles par les nouveaux
    res.status(200).json({ message: "Rôles mis à jour avec succès pour le client" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
