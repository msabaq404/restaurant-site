import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src', 'assets');
const outputDir = path.join(process.cwd(), 'src', 'assets');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(assetsDir)
  .filter(file => file.endsWith('.png'))
  .forEach(file => {
    const inputFile = path.join(assetsDir, file);
    const outputFile = path.join(outputDir, file.replace('.png', '.webp'));
    sharp(inputFile)
      .webp()
      .toFile(outputFile)
      .then(() => console.log(`Converted ${file} to WebP`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  });
