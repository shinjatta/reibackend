const express = require("express");
const cors = require("cors");
const service_nhk = require("./services/NHK_service.js");

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
/* app.use(require('./apis/NHK_api')); */

app.get(`/frases/nhk/:word`, async (req, res) => {
  const palabra = req.params.word;
  const resultado = await service_nhk.NHK_service.getFrasesNHK(palabra);
  if (!resultado) res.sendStatus(400);
  res.status(200).json(resultado); 
});

