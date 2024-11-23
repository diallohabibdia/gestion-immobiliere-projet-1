// routes/reservationRoutes.js
import {Router} from "express";
import { getAllReservations, getReservationById, createReservation, deleteReservation, updateReservation } from "../controllers/reservationController.js";
const reservationRoute = Router();

// Définir les routes pour les paiements
reservationRoute.get('/', getAllReservations)
                .post('/', createReservation)
                .get('/:id', getReservationById)
                .put('/', updateReservation)
                .delete('/', deleteReservation)


export default reservationRoute
 
