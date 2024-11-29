
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
            return 'css/[name].[hash][extname]';
          } else if (/\.(png|jpe?g|svg|gif|json)$/.test(name)) {
            return 'images/[name].[hash][extname]';
          } else {
            return 'assets/[name].[hash][extname]';
          }
        }
      }
    },
  },
});
