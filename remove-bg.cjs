const Jimp = require("jimp");
const path = require("path");

const imagePath = path.join(__dirname, "src/assets/hero-portrait.png");

Jimp.read(imagePath)
  .then((image) => {
    // Get the key color from the top-left corner (0,0)
    const keyColor = image.getPixelColor(0, 0);
    const { r: keyR, g: keyG, b: keyB } = Jimp.intToRGBA(keyColor);
    console.log(`Key color detected: R=${keyR}, G=${keyG}, B=${keyB}`);

    const threshold = 35; // Euclidean distance threshold in RGB space

    let removedCount = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];

      const dist = Math.sqrt(
        Math.pow(r - keyR, 2) +
        Math.pow(g - keyG, 2) +
        Math.pow(b - keyB, 2)
      );

      if (dist < threshold) {
        this.bitmap.data[idx + 3] = 0; // Alpha = 0 (Transparent)
        removedCount++;
      } else if (dist < threshold + 12) {
        // Linear interpolation for soft anti-aliased edge feathering
        const ratio = (dist - threshold) / 12;
        this.bitmap.data[idx + 3] = Math.round(ratio * 255);
      }
    });

    console.log(`Scanned pixels. Set ${removedCount} background pixels to transparent.`);

    // Write back to the same path
    return image.writeAsync(imagePath);
  })
  .then(() => {
    console.log("Background removed and image overwritten successfully!");
  })
  .catch((err) => {
    console.error("Error processing image:", err);
  });
