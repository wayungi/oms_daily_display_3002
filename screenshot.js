const express =  require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

let latestScreenshot = 'screenshots/screenshot.png';

// Route to render the homepage
app.get('/', (req, res) => {
  res.render('index', { screenshotPath: latestScreenshot });
});

app.post('/start', async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.redirect('/');
  }



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



