const Jimp = require("jimp");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const originalPath = "/Users/chata/.gemini/antigravity-ide/brain/e567606e-6d73-49bc-b221-9728cc7be4ae/original-hero-portrait.jpg";
const assetsDir = path.join(__dirname, "src/assets");

// 1. Refined Background Removal on Portrait
function processPortrait() {
  console.log("Starting background removal on portrait image...");
  return Jimp.read(originalPath)
    .then((image) => {
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      const keyColor = image.getPixelColor(0, 0);
      const { r: keyR, g: keyG, b: keyB } = Jimp.intToRGBA(keyColor);

      const visited = new Uint8Array(width * height);
      const queue = [];

      // Push all edge pixels as seeds to start the flood fill
      for (let x = 0; x < width; x++) {
        queue.push([x, 0]);
        visited[x] = 1;
      }
      for (let y = 1; y < height - 1; y++) {
        queue.push([0, y]);
        queue.push([width - 1, y]);
        visited[y * width] = 1;
        visited[y * width + (width - 1)] = 1;
      }

      // Dynamic face boundary to protect face highlights from left-side leak
      function getFaceBoundaryX(y) {
        if (y < 240) return 0;
        if (y >= 240 && y < 300) {
          return 330 + ((y - 240) * (340 - 330)) / (300 - 240);
        }
        if (y >= 300 && y < 326) {
          return 340 + ((y - 300) * (360 - 340)) / (326 - 300);
        }
        if (y >= 326 && y < 350) {
          return 360;
        }
        if (y >= 350 && y < 380) {
          return 360 + ((y - 350) * (370 - 360)) / (380 - 350);
        }
        if (y >= 380 && y < 420) {
          return 370 + ((y - 380) * (390 - 370)) / (420 - 380);
        }
        if (y >= 420 && y < 480) {
          return 390 + ((y - 420) * (410 - 390)) / (480 - 420);
        }
        return 0;
      }

      const threshold = 40;
      let transparentCount = 0;
      let head = 0;

      while (head < queue.length) {
        const [cx, cy] = queue[head++];
        const idx = (cy * width + cx) * 4;

        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];

        const dist = Math.sqrt(
          Math.pow(r - keyR, 2) +
          Math.pow(g - keyG, 2) +
          Math.pow(b - keyB, 2)
        );

        if (dist < threshold) {
          image.bitmap.data[idx + 3] = 0; // Transparent
          transparentCount++;

          const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1]
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const boundaryX = getFaceBoundaryX(ny);
              // Block crossing from left background into the face
              const isCrossingBarrier = boundaryX > 0 && cx < boundaryX && nx >= Math.floor(boundaryX);

              if (!isCrossingBarrier) {
                const nIdx = ny * width + nx;
                if (!visited[nIdx]) {
                  visited[nIdx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }
      }

      console.log(`Background removal done. Cleared ${transparentCount} pixels.`);
      
      // Get buffer and compress using Sharp to WebP
      return image.getBufferAsync(Jimp.MIME_PNG);
    })
    .then((pngBuffer) => {
      console.log("Compressing processed portrait using sharp...");
      const targetPortraitWebp = path.join(assetsDir, "hero-portrait.webp");
      return sharp(pngBuffer)
        .webp({ quality: 80, effort: 6 })
        .toFile(targetPortraitWebp);
    })
    .then(() => {
      console.log("Saved optimized hero-portrait.webp successfully!");
    });
}

// 2. Convert Portfolio screenshots
const screenshotsToConvert = [
  "Netlfix",
  "MovieRecommender",
  "ApplyFlow",
  "TaskManager",
  "theater"
];

function convertScreenshots() {
  console.log("Converting screenshots in assets directory:", assetsDir);
  const promises = screenshotsToConvert.map((baseName) => {
    let ext = ".png";
    let inputPath = path.join(assetsDir, baseName + ".png");
    if (!fs.existsSync(inputPath)) {
      ext = ".jpg";
      inputPath = path.join(assetsDir, baseName + ".jpg");
    }

    const outputFilename = baseName + ".webp";
    const outputPath = path.join(assetsDir, outputFilename);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File ${baseName}.png or ${baseName}.jpg not found in assets, skipping.`);
      return Promise.resolve();
    }

    console.log(`Converting ${baseName}${ext} to WebP...`);
    return sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath)
      .then((info) => {
        const origSize = fs.statSync(inputPath).size;
        const newSize = info.size;
        console.log(`Converted ${baseName}${ext} -> ${outputFilename} (${(origSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB)`);
      });
  });

  return Promise.all(promises);
}

// Execute all
processPortrait()
  .then(() => convertScreenshots())
  .then(() => {
    console.log("\nImage processing and optimization complete!");
  })
  .catch((err) => {
    console.error("Error during image optimization:", err);
  });
