// Renders scripts/audit-og.html to public/audit/og.jpg (the /audit link
// preview image, 1200x630). Run: node scripts/render-audit-og.js
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(__dirname, "audit-og.html"));
  const money = require("fs").readFileSync(path.join(__dirname, "money.svg"), "utf8");
  await page.evaluate((svg) => document.body.insertAdjacentHTML("afterbegin", svg), money);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const out = path.join(__dirname, "..", "public", "audit", "og.jpg");
  await page.screenshot({ path: out, type: "jpeg", quality: 88 });
  await browser.close();
  console.log("wrote", out);
})();
