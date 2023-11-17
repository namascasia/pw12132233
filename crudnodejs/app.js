const express = require("express");
const mysql = require("mysql");
const app = express(); //ejecución de constructos
//Habilitar recepción JSON
app.use(express.json());

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

//Agregar un maestro
app.post('/api/maestros', (req, res) =>{
    let data = {
        clave: req.body.cla,
        nombre: req.body.nom,
        departamento: req.body.dep,
        status: req.body.est
    }
    let sql = "insert into maestros set ?";

    conexion.query(sql, data, (error, results)=>{
        if (error) throw error;
        res.send(results);
    });
});
//Actualizar un maestro
app.put('/api/maestros/:id', (req, res)=>{
    let clave = req.params.id;
    let nombre = req.body.nom;
    let departamento = req.body.dep;
    let estatus = req.body.est;

    let sql =  "update maestros set nombre=?, departamento=?, status=? where clave=?";

    conexion.query(sql,[nombre, departamento, estatus,clave], (error, results)=>{
        if(error) throw error;
        res.send(results);
    });
});

//Eliminar un maestro
app.delete('/api/maestros/:id', (req,res)=>{
    let clave = req.params.id;
    let sql = "delete from maestros where clave=?";

    conexion.query(sql, clave, (error, results)=>{
        if(error) throw error;
        res.send(results);
    });
});

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