
//Importer le modele Client
import { Client } from '../models/relation.js'

const autoriser = roles => async (req, res, next) => {
    //roles peut etre plusieurs
    //roles=['employe','client']

    //Recuperer l'id a partir de la req
    const id = req.clientId

    //Chercher la personne dans la base de donnees

    try {
        const user = await Client.findByPk(id)
        if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas!" })

        //Recuperer le role de la personne 
        const userRoles = await user.getRoles()

        const hasRole = false
        const userRoleTitles = userRoles.map(role => role.titre.toLowerCase())

        if (!userRoles.length) return res.status(403).json({ message: "Pas autorise a voir cette route !!" })

        roles?.forEach(role => {
            if (userRoleTitles.includes(role.toLowerCase()))
                hasRole = true
        });

        if (hasRole) {
            next()
            return
        } else {
            return res.status(403).json({ message: "Vous n'etes pas autorises..." })
        }


    } catch (error) {
        res.status(403).json({ message: error.message })
    }

}

export default autoriser