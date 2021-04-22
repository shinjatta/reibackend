const puppeteer = require("puppeteer"); 
class Yahoo_service {
constructor (){

}
static async getFrasesYahoo(word){
  //Base configuració
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //La web que vull buscar
  await page.goto('https://news.yahoo.co.jp/search?p=&ei=utf-8');
  //Buscar la paraula
  await page.type('input #sc-kgAjT bNteFw', word);
  await page.click("button #sc-ksYbfQ LoaVT");
  //Esperar a que es carreguin les diferents noticies
  await page.waitForTimeout(3000);
  const resultados = await page.evaluate(()=>{
    //Els guardo els elements en dos arrays
    //TEXTOS
    const texts=document.querySelectorAll('.sc-ZOJMI');
    //LINKS
    const links= document.querySelectorAll('.newsFeed_item_link');
   //Creo el objeto final que voy a tener
   const resultadoFinal=[]
    for (let i = 0; i < texts.length; i++) { 
      //Creo un objecto temporal
      const resultado ={};
      //Asocio a cada apartado que quiera que tenga la aplabra correspondiente
      resultado.text=texts[i];
      resultado.link=links[i];
      //Lo pongo en el array final
      resultadoFinal.push(resultado);
    }
  });
  
  await browser.close();
  return resultados;
};

}

module.exports = {Yahoo_service};