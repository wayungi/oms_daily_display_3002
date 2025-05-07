const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://oms-weekly-display.paytronix.co.ug/'; 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: './screenshots/oms-weekly-display/screenshot.png', fullPage: true });
  await browser.close();
})();


