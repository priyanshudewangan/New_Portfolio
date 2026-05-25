const Jimp = require("jimp");
const path = require("path");

const imagePath = path.join(__dirname, "src/assets/hero-portrait.png");

Jimp.read(imagePath)
  .then((image) => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    let count = 0;

    // Scan the face region to find transparent pixels
    for (let y = 150; y < 600; y++) {
      for (let x = 300; x < 600; x++) {
        const idx = (y * width + x) * 4;
        const alpha = image.bitmap.data[idx + 3];

        if (alpha === 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          count++;
        }
      }
    }

    if (count > 0) {
      console.log(`Found ${count} transparent pixels in the face region.`);
      console.log(`Bounding Box of the hole: X: [${minX} to ${maxX}], Y: [${minY} to ${maxY}]`);
      
      // Let's print some sample coordinates to see the shape
      console.log("Sample hole coordinates:");
      let printed = 0;
      for (let y = minY; y <= maxY; y += Math.max(1, Math.round((maxY - minY) / 5))) {
        let rowHoles = [];
        for (let x = minX; x <= maxX; x++) {
          const idx = (y * width + x) * 4;
          if (image.bitmap.data[idx + 3] === 0) {
            rowHoles.push(x);
          }
        }
        if (rowHoles.length > 0) {
          console.log(`Y=${y}: X from ${rowHoles[0]} to ${rowHoles[rowHoles.length - 1]} (${rowHoles.length} pixels)`);
        }
      }
    } else {
      console.log("No transparent pixels found in the face region.");
    }
  })
  .catch((err) => {
    console.error(err);
  });
