const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Ensure the background is transparent or dark so we capture just the canvas or with good bg
  await page.goto('http://127.0.0.1:8788', { waitUntil: 'networkidle0' });
  
  // Wait a moment for rendering to complete
  await new Promise(r => setTimeout(r, 2000));
  
  const dataUrl = await page.evaluate(() => {
    const canvas = document.getElementById('trophy-canvas');
    if (!canvas) return null;
    return canvas.toDataURL('image/png');
  });
  
  if (dataUrl) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'trophy-pixelated.png'), base64Data, 'base64');
    console.log('Saved public/trophy-pixelated.png');
  } else {
    console.log('Could not find #trophy-canvas');
  }
  
  await browser.close();
})();
