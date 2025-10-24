const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'src', 'images');

const convertToWebP = async () => {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(inputDir,`${baseName}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`✅ تم تحويل: ${file} → ${baseName}.webp`);
      } catch (err) {
        console.error(`❌ فشل تحويل ${file}:`, err);
      }
    }
  }
};

convertToWebP();