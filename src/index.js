// Importamos la libreria express
import express from "express"
// const express = require('express')
// Importamos las rutas
import { productsRouter } from "./routes/products.routes.js"
import { usersRouter } from "./routes/users.routes.js"
import { postsRouter } from "./routes/posts.routes.js"
// Importamos el middleware de autenticacion
import { authMiddleware } from "./middlewares/auth.middleware.js"
// Importamos el modulo cors
import cors from "cors"
// Importamos el modulo morgan
import morgan from "morgan"

// Creamos una instancia de express
const app = express()
// Configuramos el servidor para que acepte CORS
app.use(cors())
// Configuramos el servidor para que acepte morgan
app.use(morgan("dev"))
// Configuramos el servidor para que acepte JSON
app.use(express.json())
// Definimos el puerto en el que se va a escuchar
const port = 3000

// Definimos las rutas
app.use("/api/products", authMiddleware, productsRouter)
app.use("/api/users", authMiddleware, adminMiddleware, usersRouter)
app.use("/api/posts", authMiddleware, postsRouter)
app.use("/api/auth", authRouter)

// Iniciamos el servidor
app.listen(port, () => {
    // Mostramos el mensaje
    console.log(`El servidor esta corriendo en: http://localhost:${port}`)
})