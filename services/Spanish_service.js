const puppeteer = require("puppeteer"); 
class Spanish_service {
constructor (){

}
//Base configuració
static async getSpanish(word){
  const browser = await puppeteer.launch();
  try {
  const page = await browser.newPage();
  //La paraula que vull buscar

  //La web que vull buscar
  await page.goto('https://translate.google.com/?sl=es&tl=ja&op=translate');
  //Buscar la paraula
  await page.type('textarea.er8xn', word);
  await page.keyboard.press('Enter');
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
 const numeroResultats=10;
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

module.exports = {Spanish_service};