/**
 * Script to copy GOV.UK Frontend assets (fonts, images) to the public directory.
 *
 * This script is run automatically after `npm install` via the postinstall hook.
 * It ensures that GDS Transport fonts and images are available for the application.
 */

const fs = require("fs");
const path = require("path");

const sourceDir = path.join(
  process.cwd(),
  "node_modules",
  "govuk-frontend",
  "dist",
  "govuk",
  "assets"
);
const targetDir = path.join(process.cwd(), "public", "assets");

/**
 * Recursively copies a directory from source to target.
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main execution
try {
  if (fs.existsSync(sourceDir)) {
    console.log("📦 Copying GOV.UK Frontend assets...");
    copyDir(sourceDir, targetDir);
    console.log("✅ GOV.UK Frontend assets copied to public/assets/");
  } else {
    console.log(
      "⚠️  GOV.UK Frontend not found. Run npm install first."
    );
  }
} catch (error) {
  console.error("❌ Error copying assets:", error.message);
  process.exit(1);
}
