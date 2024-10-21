import { sync } from "glob";

export default {
  base: './',  // This ensures that paths are relative to the index.html
  appType: 'mpa',
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html').map(path => path.replace(/\\/g, '/'))
    },
  },
};
