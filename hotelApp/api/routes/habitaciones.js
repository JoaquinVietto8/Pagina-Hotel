import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { countByTitle, countByType, createHabitacion, deleteHabitacion, deleteHabitacionAviability, getAllHabitacion, getHabitacion, getHabitacionRooms, updateHabitacion, updateHabitacionAviability } from "../controllers/HabitacionController.js";
import express from "express";

const router = express.Router();

//CREATE
// router.post("/:reservaid", verifyAdmin, createHabitacion);
router.post("/", verifyAdmin, createHabitacion);

//UPDATE
router.put("/:id", verifyAdmin, updateHabitacion);

//UPDATE unavaiableDates
router.put("/availability/:id", updateHabitacionAviability);

//DELETE
//router.delete("/:id/:reservaid", verifyAdmin, deleteHabitacion);
router.delete("/:id/:habitacionId", verifyAdmin, deleteHabitacion);

//GET
router.get("/find/:id", getHabitacion);


//GET ALL
router.get("/", getAllHabitacion);

router.get("/countByTitle", countByTitle);

router.get("/countByType", countByType);

//GET numeroHabitacion
router.get("/getHabitacionRooms/:id", getHabitacionRooms);


//DELETE unavaiableDates
router.put("/delavailability/:id", deleteHabitacionAviability);


export default router