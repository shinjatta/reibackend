const puppeteer = require("puppeteer"); 
class Wikipedia_service {
constructor (){

}
//Base configuració
static async getFrasesWikipedia(word){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //La web que vull buscar
  await page.goto('https://www2.nhk.or.jp/news/nsearch/query.cgi?col=news&charset=utf-8&qi=3&qt=%E5%A4%96%E5%9B%BD%E4%BA%BA');
  //Buscar la paraula
  await page.type('#searchInput', word);
  await page.click("#searchButton");
  //Esperar a que es carreguin les diferents noticies
  await page.waitForTimeout(3000);

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

module.exports = {Wikipedia_service};