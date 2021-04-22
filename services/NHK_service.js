const puppeteer = require("puppeteer"); 
class NHK_service {
constructor (){

}
//Base configuració
static async getFrasesNHK(word){
  const browser = await puppeteer.launch();
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
  //Guardo tots els ennlaços
  const enlaces= await page.evaluate(()=>{
    //Els guardo en un array elements cada a
    const elements= document.querySelectorAll('.search--list li a');
    //Creo una variable per guardar els links
    const links= [];
    //guardo el link en si
    for(let element of elements){
      links.push(element.href);  
      }
    return links;
  });
  console.log(enlaces.length);
  //Creo el objecte que pasare
  const frases =[];
  //Visito cada enllaç
  for(let enlace of enlaces){
    //Vaig al enllaç que toca
    await page.goto(enlace);
    //Espero que carregui el titol
    await page.waitForSelector('.content--summary',  {timeout: 1000});
    //Creo l'objecte frase
    const frase ={};
    //Guardo la frase
    frase.title= await page.evaluate(()=>{
      //Busco la part amb el selector titol
      //ATENTION: Nomes he agafat el titol perque aquesta web no te consistencia amb els diferents elements com es diuen els selectors i tona problemes
      const titulo= document.querySelector('.content--summary').innerText;
      return titulo;
    });
    //Guardo l'enllaç al objecte
    frase.link=enlace
    //L'afegeixo al objecte final
    frases.push(frase);
  }
  //Mostro les frases
   console.log(frases);

  await browser.close();
  return frases;
};

}

module.exports = {NHK_service};