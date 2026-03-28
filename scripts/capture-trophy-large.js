const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8788', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const dataUrl = await page.evaluate(() => {
    const canvas = document.getElementById('trophy-canvas');
    if (!canvas) return null;
    
    // Scale up using a secondary canvas to avoid anti-aliasing
    const scale = 2;
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;
    const ctx = scaledCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
    
    return scaledCanvas.toDataURL('image/png');
  });
  
  if (dataUrl) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'trophy-pixelated.png'), base64Data, 'base64');
    console.log('Saved large pixelated trophy');
  }
  
  await browser.close();
})();
