import { defineConfig } from 'vite';
import { sync } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
          } else if (/\.(png|jpe?g|svg|gif|json|webp)$/.test(name)) {
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
