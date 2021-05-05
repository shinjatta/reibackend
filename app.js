const express = require("express");
const cors = require("cors");
const service_nhk = require("./services/NHK_service.js");
const service_yahoo= require("./services/Yahoo_service.js");
const service_spanish= require("./services/Spanish_service.js");
const db = require("./services/Historial_service.js");
// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors());
app.use(express.json());

//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 3000");
});

// API call
//app.use(require('./apis/NHK_api')); 
//WEB SCRAPPING
app.get(`/frases/nhk/:word`, async (req, res) => {
  const palabra = req.params.word;
  const resultado = await service_nhk.NHK_service.getFrasesNHK(palabra);
  if (!resultado) res.sendStatus(400);
  res.status(200).json(resultado); 
});

app.get(`/frases/yahoo/:word`, async (req, res) => {
  const palabra = req.params.word;
  const resultado = await service_yahoo.Yahoo_service.getFrasesYahoo(palabra);
  if (!resultado) res.sendStatus(400);
  res.status(200).json(resultado); 
});

app.get(`/traduccion/spanish/:word`, async (req, res) => {
  const palabra = req.params.word;
  const resultado = await service_spanish.Spanish_service.getSpanish(palabra);
  if (!resultado) res.sendStatus(400);
  res.status(200).json(resultado); 
});

//BASE DE DATOS
//Get all historial
app.get(`/historial`, async (req, res, next) => {
  try{
    let results = await db.all();
    res.json(results);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});
//Get datos by palabra
app.get(`/historial/:word`, async (req, res, next) => {
  try{
    let results = await db.one(req.params.word);
    res.json(results);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});
//Insert datos
app.insert(`/historial/add`, async (req, res, next) => {
  try{
    let results = await db.one(req.params.word);
    res.json(results);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});