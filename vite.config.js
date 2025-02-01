import { defineConfig } from 'vite';
import { sync } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  appType: 'mpa', // Multi-Page Application
  root: './src', // Ensure this points to the correct root directory
  build: {
    outDir: '../dist', // Output directory
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      // Dynamically find all HTML files in the src directory
      input: sync('./src/**/*.html').map((filePath) => filePath.replace(/\\/g, '/')),
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css|scss)$/.test(name)) {
            return 'css/[name][extname]';
          } else if (/\.(mp4|jpe?g|svg|gif|json|webp)$/.test(name)) {
            return 'images/[name][extname]';
          } else {
            return 'assets/[name][extname]';
          }
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './assets/images/**/*',
          dest: 'assets/images',
        },
      ],
    }),
  ],
});