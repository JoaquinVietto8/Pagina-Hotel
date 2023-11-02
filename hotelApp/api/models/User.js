import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
{timestamps: true}
);

export default mongoose.model("User", UserSchema);