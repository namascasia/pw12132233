const express = require("express");
const mysql = require("mysql");
const app = express(); //ejecución de constructos

/**
 * Configurar conexión
 */
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pw1213'
});

//probar la conexión
conexion.connect( (error)=>{
    if(error) throw error;
    console.log("Conectado a la base de datos");
});


app.get("/", (req, res)=>{
    res.send("<h1> Ruta inicio </h1>")
});

//on server
app.listen("3000", ()=>{
    console.log("Servidor puerto 3000");
});