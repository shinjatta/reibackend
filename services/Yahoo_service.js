const puppeteer = require("puppeteer"); 
class Yahoo_service {
constructor (){

}
//Base configuració
static async getFrasesYahoo(word){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //La web que vull buscar
  await page.goto('https://news.yahoo.co.jp/search?p=&ei=utf-8');
  //Buscar la paraula
  await page.type('input #sc-kgAjT bNteFw', word);
  await page.click("button #sc-ksYbfQ LoaVT");
  //Esperar a que es carreguin les diferents noticies
  await page.waitForTimeout(3000);
  const resultados =[];
  const resultado ={};

  //Guardo tots els ennlaços
  const enlaces= await page.evaluate(()=>{
    //Els guardo en un array elements cada a
    const elements= document.querySelectorAll('.newsFeed_item_link');
    //Creo una variable per guardar els links
    const links= [];
    //guardo el link en si
    for(let element of elements){
      links.push(element.href);
      }
    return links;
  });

  //Guardo tots els exemples
  const text= await page.evaluate(()=>{
    //Els guardo en un array elements cada a
    const elements= document.querySelectorAll('.sc-ZOJMI bfJaxE');
    //Creo una variable per guardar els exemples
    const exemples= [];
    //guardo el link en si
    for(let element of elements){
      exemples.push(element.href);  
      }
    return exemples;
  });

  


  
  await browser.close();
  return frases;
};

}

module.exports = {Yahoo_service};