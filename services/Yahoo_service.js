const { text } = require("body-parser");
const puppeteer = require("puppeteer"); 
class Yahoo_service {
constructor (){

}
static async getFrasesYahoo(word){
//Base configuració
const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  //La web que vull buscar
  await page.goto('https://news.yahoo.co.jp/search?p=&ei=utf-8');
  //Buscar la paraula
  await page.type('.sc-kgoBCf', word);
  await page.click("button.sc-kpOJdX");
 //Esperar a que es carreguin les diferents noticies
  await page.waitForTimeout(3000);
  const resultados = await page.evaluate(()=>{
    //Els guardo els elements en dos arrays
    //TEXTOS
    const texts=document.querySelectorAll('.sc-ddash');
    //LINKS
    const links= document.querySelectorAll('.newsFeed_item_link');
   //Creo el objeto final que voy a tener
 const resultadoFinal=[];
 //Faig que no en retorni més de 10
 let numeroResultats=10;
 if(texts.length<numeroResultats){
   numeroResultats=texts.length;
 }
  for (let i = 0; i < numeroResultats; i++) { 
    ///Creo un objecto temporal
    const resultado ={};
    //Asocio a cada apartado que quiera que tenga la aplabra correspondiente y le digo inner text para tener le resultado de dentro del elemenyo
    resultado.text=texts[i].innerText;
    resultado.link=links[i].href;
    //Lo pongo en el array final
    resultadoFinal.push(resultado);
  }
  return resultadoFinal;
  });
  return resultados
} catch (err) {
  console.error(err.message);
} finally {
  await browser.close();
}
};

}

module.exports = {Yahoo_service};