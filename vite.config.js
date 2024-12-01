
// export default {
  //   base: './', 
  //   appType: 'mpa',
  //   root: './src',
  //   build: {
    //     outDir: '../dist',
    //     emptyOutDir: true,
    //     rollupOptions: {
      //       input: sync('./src/**/*.html').map(path => path.replace(/\\/g, '/'))
      //     },
      //   },
      // };

import { defineConfig } from 'vite';
import { sync } from "glob";
import { copy } from 'vite-plugin-copy';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  appType: 'mpa',
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html').map(path => path.replace(/\\/g, '/')),
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: ({ name }) => {
          if (/\.(css|scss)$/.test(name)) {
            return 'css/[name][extname]';
          } else if (/\.(png|jpe?g|svg|gif|json)$/.test(name)) {
            return 'images/[name][extname]'; // No hash here
          } else {
            return 'assets/[name][extname]';
          }
        }
      }
    },
  },
  plugins: [
    {
      name: 'process-data-images',
      buildStart() {
        const htmlFiles = sync('./src/**/*.html');
        const images = new Set();

        htmlFiles.forEach((file) => {
          const content = fs.readFileSync(file, 'utf-8');
          const regex = /data-images='(.*?)'/g; // Match data-images attribute
          let match;

          while ((match = regex.exec(content)) !== null) {
            const paths = JSON.parse(match[1]); // Parse JSON array
            paths.forEach(imgPath => images.add(imgPath));
          }
        });

        // Add each image to the Rollup asset pipeline
        images.forEach((imgPath) => {
          // Resolve the full path to the source image
          const resolvedPath = path.resolve('./src', imgPath);
        
          // Preserve the folder structure in the dist folder
          const relativePath = path.relative('./src/', resolvedPath); // Adjust base folder if needed
        
          this.emitFile({
            type: 'asset',
            name: relativePath, // Keeps the folder structure intact
            source: fs.readFileSync(resolvedPath), // Read the file
          });
        });
      }
    }
  ]
});
