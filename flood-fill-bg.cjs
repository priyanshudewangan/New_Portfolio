const Jimp = require("jimp");
const path = require("path");

const inputPath = "/Users/chata/.gemini/antigravity-ide/brain/91a17bdd-4ebe-480f-b2d8-f0989723796e/media__1779638196352.jpg";
const outputPath = "/Users/chata/Desktop/Portfolio may 24/src/assets/hero-portrait.png";

Jimp.read(inputPath)
  .then((image) => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    console.log(`Image loaded. Dimensions: ${width}x${height}`);

    // Get key color from top-left corner
    const keyColor = image.getPixelColor(0, 0);
    const { r: keyR, g: keyG, b: keyB } = Jimp.intToRGBA(keyColor);
    console.log(`Key background color: R=${keyR}, G=${keyG}, B=${keyB}`);

    // Create visited matrix
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Push all edge pixels as seeds to start the flood fill
    for (let x = 0; x < width; x++) {
      queue.push([x, 0]);
      queue.push([x, height - 1]);
      visited[x] = 1;
      visited[(height - 1) * width + x] = 1;
    }
    for (let y = 1; y < height - 1; y++) {
      queue.push([0, y]);
      queue.push([width - 1, y]);
      visited[y * width] = 1;
      visited[y * width + (width - 1)] = 1;
    }

    let transparentCount = 0;

    // Breadth-First Search (BFS) flood fill
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

      // Sensitive face bounding box: set face threshold to 20 (nose/cheek protection)
      const isFaceRegion = (cx >= 370 && cx <= 580 && cy >= 220 && cy <= 450);
      const threshold = isFaceRegion ? 20 : 42;

      if (dist < threshold) {
        // Set alpha to 0 (make transparent)
        image.bitmap.data[idx + 3] = 0;
        transparentCount++;

        // Add 4-connected neighbors
        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1]
        ];

        for (const [nx, ny] of neighbors) {
          // Block the leak right at the tip of the nose / cheek junction on the left
          const isBarrier = ((nx === 368 || nx === 369) && ny >= 270 && ny <= 380);

          if (nx >= 0 && nx < width && ny >= 0 && ny < height && !isBarrier) {
            const nIdx = ny * width + nx;
            if (!visited[nIdx]) {
              visited[nIdx] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      } else if (dist < threshold + 12) {
        // Apply slight feathering at the boundary, but do not propagate BFS further
        const ratio = (dist - threshold) / 12;
        image.bitmap.data[idx + 3] = Math.round(ratio * 255);
      }
    }

    console.log(`Flood fill complete. Converted ${transparentCount} edge-connected background pixels to transparent.`);
    
    // Save image to output path
    return image.writeAsync(outputPath);
  })
  .then(() => {
    console.log("Image saved successfully!");
  })
  .catch((err) => {
    console.error("Error processing image:", err);
  });
