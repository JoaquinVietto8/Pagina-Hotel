import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import reservasRoute from "./routes/reservas.js";
import habitacionesRoute from "./routes/habitaciones.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()


// Establecemos la conexion inicial con MongoDB
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!")
    } catch (error) {
        throw error
    }
};


// Si la base de datos se desconecta, veremos este mensaje
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
}) ;


//middlewares

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/reservas", reservasRoute);
app.use("/api/habitaciones", habitacionesRoute);


// Manejo de errores
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Ups! algo salio mal";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


// Establecemos la conexion al backend:
app.listen(8800, ()=>{
    connect()
    console.log("Connected to Backend!")
});