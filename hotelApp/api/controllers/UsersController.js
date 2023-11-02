import User from "../models/User.js";

//Actualizamos un usuario
export const updateUser = async (req, res, next) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}


//Borramos un usuario
export const deleteUser = async (req, res, next) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("La reserva fue eliminada");
    }catch(err){
        next(err);
    }
}


//Vemos un usuario
export const getUser = async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}


//Vemos todas los usuarios
export const getAllUser = async (req, res, next) =>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}