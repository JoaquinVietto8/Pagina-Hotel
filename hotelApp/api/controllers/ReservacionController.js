import Reservacion from "../models/Reservacion.js";

//Creamos una nueva reserva
export const createReservacion = async (req, res, next) =>{
    const newReservacion = new Reservacion(req.body)
    try{
        const savedReservacion = await newReservacion.save();
        res.status(200).json(savedReservacion);
    }catch(err){
        next(err);
    }
}


//Actualizamos una reserva
export const updateReservacion = async (req, res, next) =>{
    try{
        const updatedReservacion = await Reservacion.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updatedReservacion);
    }catch(err){
        next(err);
    }
}


//Borramos una reserva
export const deleteReservacion = async (req, res, next) =>{
    try{
        await Reservacion.findByIdAndDelete(req.params.id);
        res.status(200).json("La reserva fue eliminada");
    }catch(err){
        next(err);
    }
}


//Vemos una reserva en particular
export const getReservacion = async (req, res, next) =>{
    try{
        const reservacion = await Reservacion.findById(req.params.id);
        res.status(200).json(reservacion);
    }catch(err){
        next(err);
    }
}


//Vemos todas las reservas
export const getAllReservacion = async (req, res, next) =>{
    try{
        const reservaciones = await Reservacion.find();
        res.status(200).json(reservaciones);
    }catch(err){
        next(err);
    }
}