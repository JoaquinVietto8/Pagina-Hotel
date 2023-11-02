import mongoose from "mongoose";
const { Schema } = mongoose;

const HabitacionSchema = new mongoose.Schema({
    
    titulo: {
        type: String, 
        required: true
    },
    precio: {
        type: Number,  
        required: true
    },
    maxPeople: {
        type: Number, 
        //isIn: [1, 2, 3, 4], 
        required: true
    },
    photos: {
        type: [String], 
    },
    descripcion: {
        type: String, 
        required: true
    },
    numeroHabitacion: [{number: Number, unavaiableDates:{type: [Date]} }],
},
{timestamps: true}
);

export default mongoose.model("Habitacion", HabitacionSchema)