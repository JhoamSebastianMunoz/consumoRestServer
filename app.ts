import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express()
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10101;

//----------------------------------------------------------------------------------------------
// 1. Cree una ruta que reciba los datos del registro de una persona de la siguiente manera y consúmala con
//  un cliente rest:
//  Parámetros en la ruta:
//  ● domicilio
//  Parámetros de consulta(string query):
//  ● cc
//  ● nombres
//  ● apellidos
//  método: POST
app.post('/parametros-ruta/:domicilio', function (request:Request, response:Response){
    let domicilio =request.params.domicilio;
    let cc =request.query.cc;
    let nombres =request.query.nombres;
    let apellidos = request.query.apellidos;
    return response.status(201).json({
        "status":"ok params",
        cc:cc,nombres:nombres,apellidos:apellidos
    });
});

//----------------------------------------------------------------------------------------------
// 2. Cree una ruta que reciba los datos del registro de un artículo de la siguiente manera y consúmala con un
//  cliente rest::
//  Parámetros en la ruta:
//  ● id
//  ● peso
//  Json con propiedades:
//  ● ancho
//  ● alto
//  método: POST
app.post('/parametros-ruta/:id/:peso', function (request:Request,response:Response){
    let id = request.params.id;
    let peso = request.params.peso;
    let ancho = request.body.ancho;
    let alto = request.body.alto;
    return response.status(201).json({
        "status":"ok params",
        id:id,
        peso:peso,
        ancho:ancho,
        alto:alto
    });
});

//-------------------------------------------------------------------------------------------
// 3. Cree una ruta que reciba los datos del borrado de un usuario de la siguiente manera y consúmala con un
//  cliente rest::
//  Parámetros de consulta(string query):
//  ● cc
//  Json con propiedades:
//  ● motivo
//  Cabeceras con:
//  ● id
//  método: DELETE
//  ●
app.delete('/delete-parametros-consulta/', function(request:Request,response: Response){
    let cc= request.query.cc;
    let motivo = request.body.motivo;
    let id = request.header("Authorization");
    return response.status(200).json({
        "status":"ok delete",
        id:id,
        cc:cc,
        motivo:motivo
    
    });
});

//-----------------------------------------------------------------------------------------
// 4. Cree una ruta que reciba los datos de la actualización del registro de un usuario de la siguiente manera y
// consúmala con un cliente rest::
// Parámetros de consulta(string query):
// ● cc
// Json con propiedades:
// ● apellidos
// Cabeceras con:
// ● domicilio
// método: PUT

app.put('/put-parametro-consulta-body-cabecera/',function(request:Request,response:Response){
    let cc = request.query.cc;
    let apellidos = request.body.apellidos;
    let domicilio = request.header("Authorization");
    return response.status(200).json({
        "status":"ok update",
        domicilio:domicilio,
        cc:cc,
        apellidos:apellidos
        
    });
});

//--------------------------------------------------------------------------------------------
// 5. Cree una ruta que reciba los datos de la actualización del registro de un usuario de la siguiente manera y
// consúmala con un cliente rest::
// Parámetros de consulta(string query):
// ● precio
// Parámetros en la ruta:
// ● cantidad
// ● marca
// Cabeceras con:
// ● domicilio
// método: GET
app.get('/get-parametros-consulta-ruta-cabecera/:cantidad/:marca/',function(request:Request,response:Response){
    let precio = request.query.precio;
    let cantidad = request.params.cantidad;
    let marca = request.params.marca;
    let domicilio = request.header("Authorization");
    return response.status(200).json({
        "status":"ok get",
        domicilio:domicilio,
        precio:precio,
        cantidad:cantidad,
        marca:marca
    });
});


app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error: any) => {
    throw new Error(error.message);
});
