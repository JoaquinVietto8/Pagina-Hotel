import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


// Funcion que permite el registro de un usuario
export const register = async (req, res, next)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        if (!req.body.nombre) {
            return next(createError(400, "El nombre es obligatorio"));
        }

        if (!req.body.apellido) {
            return next(createError(400, "El apellido es obligatorio"));
        }

        if (!req.body.dni) {
            return next(createError(400, "El DNI es obligatorio"));
        }

        if (!req.body.direccion) {
            return next(createError(400, "La dirección es obligatoria"));
        }

        if (!req.body.telefono) {
            return next(createError(400, "El número de teléfono es obligatorio"));
        }

        if (!req.body.username) {
            return next(createError(400, "El nombre de usuario es obligatorio"));
        }

        if (!req.body.email) {
            return next(createError(400, "El correo electrónico es obligatorio"));
        }

        if (!req.body.password) {
            return next(createError(400, "La contraseña es obligatoria"));
        }

        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return next(createError(400, "El nombre de usuario ingresado ya está en uso"));
        }

        const existingDni = await User.findOne({ dni: req.body.dni });
        if (existingDni) {
            return next(createError(400, "El DNI ingresado ya está en uso"));
        }

        const existingTelefono = await User.findOne({ telefono: req.body.telefono });
        if (existingTelefono) {
            return next(createError(400, "El número de telefono ingresado ya está en uso"));
        }

        const existingMail = await User.findOne({ email: req.body.email });
        if (existingMail) {
            return next(createError(400, "El correo electrónico ingresado ya está en uso"));
        }

        await newUser.save()
        res.status(200).send("Usuario ha sido creado")
    } catch(err){
        next(err);
    }
};


// Funcion que permite el inicio de sesion de un usuario
export const login = async (req, res, next)=>{
    try{

        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "El usuario ingresado no existe"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) 
            return next(createError(400, "La contraseña ingresada es incorrecta"));

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly: true,}).status(200).json({...otherDetails});
    } catch(err){
        next(err);
    }
};


// Funcion que permite cerrar sesion a un usuario inicializado
export const logout = (req, res) => {
    res.clearCookie("access_token").redirect("/");
  };