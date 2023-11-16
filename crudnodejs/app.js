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

//on server
app.listen("3000", ()=>{
    console.log("Servidor puerto 3000");
});

app.get("/", (req, res)=>{
    res.send("<h1> Ruta inicio </h1>")
});
// app.put();
// app.post();
// app.delete();

//Mostrar todos los maestros
app.get('/api/maestros', (req, res)=>{
    conexion.query('select * from maestros', (error,filas)=>{
        if(error) throw error;
        res.send(filas);
    });
});

//Mostrar un solo maestro
app.get('/api/maestros/:id', (req, res)=>{
    // conexion.query("select * from maestros where clave = ? LIMIT 1", [req.params.id], (error, fila)=>{
    //         if(error) throw error;
    //         res.send(fila);
    // }); 
    const { id } = req.params;
    conexion.query(`select * from maestros where clave = ${id} LIMIT 1`, (error,filas)=>{
        if(error) throw error;
        res.send(filas);
    });
});