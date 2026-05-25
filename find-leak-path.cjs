const Jimp = require("jimp");
const path = require("path");

const inputPath = "/Users/chata/.gemini/antigravity-ide/brain/91a17bdd-4ebe-480f-b2d8-f0989723796e/media__1779638196352.jpg";

Jimp.read(inputPath)
  .then((image) => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    const keyColor = image.getPixelColor(0, 0);
    const { r: keyR, g: keyG, b: keyB } = Jimp.intToRGBA(keyColor);

    const visited = new Uint8Array(width * height);
    const parent = new Int32Array(width * height);
    parent.fill(-1);

    const queue = [];

    // Push left background border pixels as seeds
    for (let y = 150; y < 500; y++) {
      queue.push([0, y]);
      visited[y * width] = 1;
    }

    const threshold = 42;
    let leakNode = -1;

    // We target the nose bridge coordinate we know was transparent (Y=326, X=370-390, or let's say Y=326, X=370)
    const targetX = 370;
    const targetY = 326;
    const targetIdx = targetY * width + targetX;

    let head = 0;
    while (head < queue.length) {
      const [cx, cy] = queue[head++];
      const currIdx = cy * width + cx;

      if (currIdx === targetIdx) {
        leakNode = currIdx;
        break;
      }

      const idx = currIdx * 4;
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];

      const dist = Math.sqrt(
        Math.pow(r - keyR, 2) +
        Math.pow(g - keyG, 2) +
        Math.pow(b - keyB, 2)
      );

      // Simple flood fill without barriers to trace the leak path
      if (dist < threshold) {
        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1]
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = ny * width + nx;
            if (!visited[nIdx]) {
              visited[nIdx] = 1;
              parent[nIdx] = currIdx;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    if (leakNode !== -1) {
      console.log("Leak path found! Tracing backwards from nose (X=370, Y=326) to background:");
      let curr = leakNode;
      const pathNodes = [];
      while (curr !== -1) {
        const cx = curr % width;
        const cy = Math.floor(curr / width);
        pathNodes.push([cx, cy]);
        curr = parent[curr];
      }
      pathNodes.reverse();

      // Print path nodes at intervals
      console.log(`Path length: ${pathNodes.length} pixels.`);
      console.log("Key path coordinates:");
      for (let i = 0; i < pathNodes.length; i += Math.max(1, Math.round(pathNodes.length / 15))) {
        const [x, y] = pathNodes[i];
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        console.log(`Step ${i}: (${x}, ${y}) - RGB=(${r},${g},${b})`);
      }
      // Print final step
      const [ex, ey] = pathNodes[pathNodes.length - 1];
      console.log(`End: (${ex}, ${ey})`);
    } else {
      console.log("No leak path found to (370, 326) under threshold 42.");
    }
  })
  .catch((err) => {
    console.error(err);
  });
