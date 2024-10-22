import { sync } from "glob";

export default {
  base: './', 
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
