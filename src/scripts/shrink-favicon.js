import sharp from "sharp";
import path from "path";

const inputPath = path.join(process.cwd(), "public", "favicon.webp");
const outputPath = path.join(process.cwd(), "public", "favicon-48x48.webp");

sharp(inputPath)
  .resize(48, 48)
  .toFile(outputPath)
  .then(() => console.log("Favicon resized to 48x48 and saved as favicon-48x48.webp"))
  .catch(err => console.error("Error resizing favicon:", err));
