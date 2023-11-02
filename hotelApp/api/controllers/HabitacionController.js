import Habitacion from "../models/Habitacion.js"
import Reservacion from "../models/Reservacion.js"
import { createError } from "../utils/error.js"

// Creamos una habitacion
export const createHabitacion = async (req, res, next) =>{

    const newHabitacion = new Habitacion(req.body)
    try{
        const savedHabitacion = await newHabitacion.save();
        res.status(200).json(savedHabitacion);
    }catch(err){
        next(err);
    }

    /*
    const reservaId = req.params.reservaid;
    const newHabitacion = new Habitacion(req.body)

    try{
        const savedHabitacion = await newHabitacion.save();
        try{
            await Paquete.findByIdAndUpdate(paqueteId, {$push : {habitacion: savedHabitacion._id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(savedHabitacion);
    } catch(err){
        next(err);
    } */
};


//Actualizamos una habitacion
export const updateHabitacion = async (req, res, next) =>{
    try{
        const updatedHabitacion = await Habitacion.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updatedHabitacion);
    }catch(err){
        next(err);
    }
};


//Borramos una habitacion
export const deleteHabitacion = async (req, res, next) =>{

    try{
        await Habitacion.findByIdAndDelete(req.params.id);
        res.status(200).json("La habitacion fue eliminada");
    }catch(err){
        next(err);
    }

/*    const paqueteId = req.params.paqueteid;
    try{
        await Habitacion.findByIdAndDelete(req.params.id);
        try{
            await Reservacion.findByIdAndUpdate(paqueteId, {$pull : {habitacion: req.params.id}});
        }catch(err){
            next(err);
        }
        res.status(200).json("La habitacion fue eliminada");
    }catch(err){
        next(err);
    } */
};


//Vemos una habitacion
export const getHabitacion = async (req, res, next) =>{
    try{
        const habitacion = await Habitacion.findById(req.params.id);
        res.status(200).json(habitacion);
    }catch(err){
        next(err);
    }
};


//Vemos todas las habitaciones
export const getAllHabitacion = async (req, res, next) =>{

    const {adults, childrens, ...others} = req.query;
    try{
        const maxPeoples = parseInt(adults) + parseInt(childrens);
        let filter = {...others, maxPeople: {$eq: maxPeoples}};
        if (adults === '1' && childrens === '0') {
            filter.maxPeople = 1;
        }  
        const habitaciones = await Habitacion.find(filter).limit(req.query.limit);
        res.status(200).json(habitaciones);
    }catch(err){
        next(err);
    }
};



export const countByTitle = async (req, res, next) =>{
    const titles = req.query.titles.split(",")
    try{
        const list = await Promise.all(titles.map(titulo=>{
            return Habitacion.countDocuments({titulo:titulo})
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
};



export const countByType = async (req, res, next) =>{
    try{
        const dobleSCount = await Habitacion.countDocuments({titulo:"Habitacion Doble Individual"});
        const dobleMCount = await Habitacion.countDocuments({titulo:"Habitacion Doble Matrimonial"});
        const tripleSCount = await Habitacion.countDocuments({titulo:"Habitacion Triple Individual"})
        const tripleMCount = await Habitacion.countDocuments({titulo:"Habitacion Triple Matrimonial"})
        const cuadrupleSCount = await Habitacion.countDocuments({titulo:"Habitacion Cuadruple Individual"})
        const cuadrupleMCount = await Habitacion.countDocuments({titulo:"Habitacion Cuadruple Matrimonial"})

        res.status(200).json([
           { titulo:"Habitacion Doble Individual", count:  dobleSCount },
           { titulo:"Habitacion Doble Matrimonial",  count: dobleMCount },
           { titulo:"Habitacion Triple Individual",  count: tripleSCount },
           { titulo:"Habitacion Triple Matrimonial",  count:  tripleMCount },
           { titulo:"Habitacion Cuadruple Individual", count: cuadrupleSCount},
           { titulo:"Habitacion Cuadruple Matrimonial", count:  cuadrupleMCount },
        ]);
    }catch(err){
        next(err);
    }
};



// Funcion que retorna el arreglo de numeros de una habitacion en particular
export const getHabitacionRooms = async (req, res, next) =>{
    console.log('getHabitacionRooms called');
    try{
        const habitacion = await Habitacion.findById(req.params.id);
        //const numeroHabitacionList = habitacion.numeroHabitacion.map(numero => numero.number);
        //res.status(200).json(numeroHabitacionList);
         res.status(200).json(habitacion.numeroHabitacion);
    }catch(err){
        next(err);
    }
};



export const updateHabitacionAviability = async (req, res, next) =>{
    try{
        await Habitacion.updateOne({"numeroHabitacion._id": req.params.id}, {
            $push: {"numeroHabitacion.$.unavaiableDates": req.body.dates},
          });
        res.status(200).json("El estado de la habitacion fue actualizado");
    }catch(err){
        next(err);
    }
};



export const deleteHabitacionAviability = async (req, res, next) => {
    try {
      await Habitacion.updateMany(
        { "numeroHabitacion._id": req.params.id },
        {
          $pull: { "numeroHabitacion.$.unavaiableDates": { $in: req.body.dates } },
        }
      );
  
      res.status(200).json("Las fechas fueron eliminadas de la habitación");
    } catch (err) {
      next(err);
    }
  };