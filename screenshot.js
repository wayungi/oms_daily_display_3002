const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://oms-weekly-display.paytronix.co.ug';
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle0' });
 
  while (true) {
    await new Promise(r => setTimeout(r, 14000)); /***  wait 14 seconds to ensure complete loading ***/
    await page.screenshot({ path: `screenshots/screenshot.png`, fullPage: true });
    console.log(`Captured screenshot.png`);
  }

  // await browser.close();
})();



