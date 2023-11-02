import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/UsersController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("Hola usuario, estas loggeado")
});

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("Hola usuario, estas loggeado y puedes eliminar tu cuenta")
});


router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("Hola Admin, estas loggeado y puedes eliminar todas las cuentas")
});
*/

//UPDATE
router.put("/:id", verifyUser, updateUser);


//DELETE
router.delete("/:id", verifyUser, deleteUser);


//GET
router.get("/:id", verifyUser, getUser);


//GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router