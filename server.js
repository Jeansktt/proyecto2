require("dotenv").config();

const { log } = require("console");
const exp = require("constants");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Se ha ejecutado la petición");
});
//Middleware que muestra informacion sobre la peticion entrante.
app.use(morgan("dev"));

//middleware de usuarios

const { newUser } = require ('./controllers/users');
//registro de usuario
app.post('/users', newUser)
//Middleware de error
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });

  //Ruta no encontrada
});
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});


// Ponemos el servidor a escuchar peticiones en un puerto dado.