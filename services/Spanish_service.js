const puppeteer = require("puppeteer"); 
class Spanish_service {
constructor (){

}
//Base configuració
static async getSpanish(word){
  const browser = await puppeteer.launch();
  try {
  const page = await browser.newPage();
  let link1="https://translate.google.com/?sl=ja&tl=es&text=";
  let link= link1.concat(word);
  //La web que vull buscar
  await page.goto(link);
  await page.click(".AIC7ge button")
  await page.waitForSelector('.VIiyi');
  const resultados = await page.evaluate(()=>{
    const text=document.querySelector('.VIiyi').innerText;
    return text;
  });
  return resultados;
  } catch (err) {
  console.error(err.message);
  } finally {
    await browser.close();
  }
};

}

module.exports = {Spanish_service};