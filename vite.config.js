import { defineConfig } from 'vite';
import { sync } from 'glob';

// import fs from 'fs';
// import path from 'path';

export default defineConfig({
  base: './',
  appType: 'mpa',
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html').map((filePath) => filePath.replace(/\\/g, '/')),
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: ({ name }) => {
          if (/\.(css|scss)$/.test(name)) {
            return 'css/[name][extname]';
          } else if (/\.(png|jpe?g|svg|gif|json)$/.test(name)) {
            return 'images/[name][extname]';
          } else {
            return 'assets/[name][extname]';
          }
        },
      },
    },
  },
  // plugins: [
  //   {
  //     name: 'process-data-images',
  //     buildStart() {
  //       const htmlFiles = sync('./src/**/*.html');
  //       const images = new Set();

  //       htmlFiles.forEach((file) => {
  //         const content = fs.readFileSync(file, 'utf-8');
  //         const regex = /data-images=['"](\[.*?\])['"]/g; // Match data-images attributes
  //         let match;

  //         while ((match = regex.exec(content)) !== null) {
  //           const paths = JSON.parse(match[1]); // Parse JSON array
  //           paths.forEach((imgPath) => {
  //             images.add(imgPath); // Add image path
  //             console.log('Found image path:', imgPath); // Log image paths
  //           });
  //         }
  //       });

  //       // Add each image to the Rollup asset pipeline
  //       images.forEach((imgPath) => {
  //         const resolvedPath = path.resolve('./src', imgPath);
  //         const fileName = path.basename(imgPath); // Extract file name
  //         const finalPath = path.join('images/img', fileName); // Target folder in dist

  //         console.log('Resolved Path:', resolvedPath);
  //         console.log('Final Path:', finalPath);

  //         this.emitFile({
  //           type: 'asset',
  //           name: finalPath,
  //           source: fs.readFileSync(resolvedPath),
  //         });
  //       });
  //     },
  //     closeBundle() {
  //       // Locate all HTML files in the dist directory
  //       const distHtmlFiles = sync(path.resolve('../dist/**/*.html')); // Use absolute path

  //       distHtmlFiles.forEach((file) => {
  //         let content = fs.readFileSync(file, 'utf-8');
  //         console.log(`Processing file: ${file}`);

  //         // Replace data-images paths
  //         content = content.replace(/data-images=['"](\[.*?\])['"]/g, (match, p1) => {
  //           try {
  //             const paths = JSON.parse(p1); // Parse JSON array
  //             const updatedPaths = paths.map((imgPath) =>
  //               imgPath.replace('./assets/images/img/', './images/img/')
  //             );
  //             console.log('Original paths:', paths);
  //             console.log('Updated paths:', updatedPaths);
  //             return `data-images='${JSON.stringify(updatedPaths)}'`;
  //           } catch (error) {
  //             console.error('Failed to parse data-images JSON:', p1, error);
  //             return match; // Leave unchanged on error
  //           }
  //         });

  //         // Write the updated content back to the file
  //         fs.writeFileSync(file, content, 'utf-8');
  //         console.log(`Updated HTML file: ${file}`);
  //       });
  //     },
  //   },
  // ],

});
