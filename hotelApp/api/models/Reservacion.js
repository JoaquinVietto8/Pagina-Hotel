import mongoose from "mongoose";
const { Schema } = mongoose;

const ReservacionSchema = new mongoose.Schema({
    fechaIngreso:{
        type: String,
        require: true
    },
    fechaSalida:{
        type: String,
        require: true
    },
    cantAdultos:{
        type: Number,
        require: true
    },
    cantMenores:{
        type: Number,
        require: true
    },
    cantHabitaciones:{
        type: Number,
        require: true
    },
    habitacion:{
        type: [String],
    },
    metodoPago:{
        type: String, 
        isIn: ['Debito/Credito', 'Efectivo'],
        required: true
    },
    MontoTotal:{
        type: Number,
        require: true
    }
});

export default mongoose.model("Reservacion", ReservacionSchema)