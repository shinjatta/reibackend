const puppeteer = require("puppeteer"); 

(async ()=> {
//Base configuració
const browser = await puppeteer.launch();
const page = await browser.newPage();
//Cuidado esto lo borras despues shin
const word="警察";
//La web que vull buscar
await page.goto('https://news.yahoo.co.jp/search?p=&ei=utf-8');
//Buscar la paraula
await page.type('input.sc-TOsTZ', word);
await page.click("button.sc-cJSrbW");
//Esperar a que es carreguin les diferents noticies
await page.waitForTimeout(3000);
const resultados = await page.evaluate(()=>{
  //Els guardo els elements en dos arrays
  //TEXTOS
  const texts=document.querySelectorAll('.sc-ZOJMI bfJaxE');
  //LINKS
  const links= document.querySelectorAll('.newsFeed_item_link');
 //Creo el objeto final que voy a tener
 const resultadoFinal=[]
  for (let i = 0; i < text.length; i++) { 
    //Creo un objecto temporal
    const resultado ={};
    //Asocio a cada apartado que quiera que tenga la aplabra correspondiente
    resultado.text=texts[i];
    resultado.link=links[i];
    //Lo pongo en el array final
    resultadoFinal.push(resultado);
  }
});

console.log(resultados);
await browser.close();


})();






/* const express = require("express");
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
/* app.use(require('./apis/NHK_api')); 

app.get(`/frases/nhk/:word`, async (req, res) => {
  const palabra = req.params.word;
  const resultado = await service_nhk.NHK_service.getFrasesNHK(palabra);
  if (!resultado) res.sendStatus(400);
  res.status(200).json(resultado); 
}); */

