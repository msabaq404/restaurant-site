import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from 'url'; // Import fileURLToPath

// Get the component name from command line arguments
const [,, componentName] = process.argv;
if (!componentName) {
  console.error("Usage: node preview-component.js ComponentName");
  process.exit(1);
}

const componentPath = path.join("../components", `${componentName}.astro`);
// const pagePath = path.join("../pages", `preview-${componentName.toLowerCase()}.astro`); // No longer needed directly for absPagePath

// Astro page template
const pageContent = `---
import ${componentName} from "../../components/${componentName}.astro";
import BaseLayout from "../../layouts/BaseLayout.astro"; // Added BaseLayout import
---

<BaseLayout>
  <main class="flex items-center justify-center min-h-screen">
    <${componentName} />
  </main>
</BaseLayout>
`;

// Use import.meta.url to get the directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the preview directory path
const previewDirPath = path.join(__dirname, '..', 'pages', 'preview');

// Correctly construct the absolute path to the preview page in src/pages/preview
const absPagePath = path.join(previewDirPath, `preview-${componentName.toLowerCase()}.astro`);

// Ensure the preview directory exists
if (!fs.existsSync(previewDirPath)) {
  fs.mkdirSync(previewDirPath, { recursive: true });
  console.log(`Created directory: src/pages/preview`);
}

// Always write/update the preview page
fs.writeFileSync(absPagePath, pageContent, "utf-8");
console.log(`Preview page updated: src/pages/preview/preview-${componentName.toLowerCase()}.astro`);

// Start the dev server if not running, then open the preview page in the browser
const previewUrl = `http://localhost:4321/preview/preview-${componentName.toLowerCase()}`;

// Try to open the browser (Windows)
exec(`start ${previewUrl}`);
