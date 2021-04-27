const puppeteer = require("puppeteer"); 
class NHK_service {
constructor (){

}
//Base configuració
static async getFrasesNHK(word){
  const browser = await puppeteer.launch();
  try {
  const page = await browser.newPage();
  //La paraula que vull buscar
  /* const word=palabra; */
  //La web que vull buscar
  await page.goto('https://www2.nhk.or.jp/news/nsearch/query.cgi?col=news&charset=utf-8&qi=3&qt=%E5%A4%96%E5%9B%BD%E4%BA%BA');
  //Buscar la paraula
  await page.type('#s', word);
  await page.click(".submit button");
  //Esperar a que es carreguin les diferents noticies
await page.waitForTimeout(3000);
const resultados = await page.evaluate(()=>{
  //Els guardo els elements en dos arrays
  //TEXTOS
  const texts=document.querySelectorAll('.search-note');
  //LINKS
  const links= document.querySelectorAll('.search--list li a');
 //Creo el objeto final que voy a tener
 const resultadoFinal=[]
 //Faig que no en retorni més de 10
 let numeroResultats=10;
 if(texts.length<numeroResultats){
   numeroResultats=texts.length;
 }
  for (let i = 0; i < numeroResultats; i++) { 
    //Creo un objecto temporal
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

module.exports = {NHK_service};