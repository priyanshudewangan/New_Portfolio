const Jimp = require("jimp");
const path = require("path");

const inputPath = "/Users/chata/.gemini/antigravity-ide/brain/91a17bdd-4ebe-480f-b2d8-f0989723796e/media__1779638196352.jpg";

Jimp.read(inputPath)
  .then((image) => {
    const width = image.bitmap.width;
    
    // We inspect a horizontal line at y=345 (cheek area)
    const y = 345;
    console.log(`Inspecting pixels at Y=${y} (horizontal scan across nose edge):`);
    
    for (let x = 250; x <= 600; x += 5) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      
      // Calculate distance to background key color (182, 182, 182)
      const dist = Math.sqrt(
        Math.pow(r - 182, 2) +
        Math.pow(g - 182, 2) +
        Math.pow(b - 182, 2)
      );
      
      console.log(`X=${x}: RGB=(${r},${g},${b}) Dist=${dist.toFixed(1)}`);
    }
  })
  .catch((err) => {
    console.error(err);
  });
