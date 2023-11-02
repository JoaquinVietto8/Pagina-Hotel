import express from "express";
import { createReservacion, deleteReservacion, getAllReservacion, getReservacion, updateReservacion } from "../controllers/ReservacionController.js";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createReservacion);

//UPDATE
router.put("/:id", verifyUser, updateReservacion);


//DELETE
router.delete("/:id", verifyUser, deleteReservacion);


//GET
router.get("/:id", verifyUser, getReservacion);


//GET ALL
router.get("/", verifyUser, getAllReservacion);

export default router;