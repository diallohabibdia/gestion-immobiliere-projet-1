import { Client } from "../models/relation.js";

//Importer le module de hachage
import bcrypt from 'bcryptjs'

//Importer le module qui genere la clef (jeton)
import jwt from 'jsonwebtoken'

//Ajouter les validations
import { validationResult } from "express-validator";

export const login = async (req, res) => {
    
    //Recuperation des resultats de la validation 
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    
    //Les informations de connexion

    const { email, mot_de_passe } = req.body

    //Verification de l'email
    const emailRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if (!emailRegex.test(email)) return res.status(404).json({ message: "L'email est incorrect" })

    //Chercher la personne dans la base de donnees

    try {
        const user = await Client.findOne({ where: { email } })

        //Verifier la presence de cette personne dans la base de donnees
        if (!user) return res.status(404).json({ message: "La personne n'existe pas!" })
        //Verification du mot de passe

        const mdpCorrect = bcrypt.compareSync(mot_de_passe, user.mot_de_passe)

        if (!mdpCorrect) return res.status(401).json({ message: "Mot de passe incorrect" })

        //Creation de la clef d'acces
        const payload = { id: user.id }
        const token = jwt.sign(payload, process.env.CODE_SECRET)

        res.status(200).json({ data: user, token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}