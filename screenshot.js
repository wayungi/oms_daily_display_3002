const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const screenshotsDir = path.join(__dirname, "public", "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

let latestScreenshot = "screenshots/screenshot.png";

app.get("/", (req, res) => {
  res.render("index", { screenshotPath: latestScreenshot });
});

(async () => {
  const url = "https://oms-weekly-display.paytronix.co.ug";
  let toggle = true;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url); //omited waitUntil: "networkidle0" to allow the page to load completely

  while (true) {
    await page.reload({ waitUntil: "networkidle0" });
    const waitTime = toggle ? 0 : 49000;
    console.log(`Waiting for ${waitTime / 1000} seconds...`);
    await new Promise((r) => setTimeout(r, waitTime));

    const timestamp = Date.now();
    const screenshotFilename = `screenshot-${timestamp}.png`;
    const screenshotPath = path.join(screenshotsDir, screenshotFilename);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    latestScreenshot = `screenshots/${screenshotFilename}`;
    console.log(
      `Captured another screenshot at ${new Date().toLocaleTimeString()}\t filename is${latestScreenshot}`
    );

    if (!toggle) {
      await new Promise((r) => setTimeout(r, 49000));
    }
    
    toggle = !toggle;
  }
  //await browser.close();
})();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
