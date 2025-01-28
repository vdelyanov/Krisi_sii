// vite.config.js
import { defineConfig } from "file:///Users/velizardelyanov/Desktop/krisi_website/krisisii/node_modules/vite/dist/node/index.js";
import { sync } from "file:///Users/velizardelyanov/Desktop/krisi_website/krisisii/node_modules/glob/dist/esm/index.js";
import { viteStaticCopy } from "file:///Users/velizardelyanov/Desktop/krisi_website/krisisii/node_modules/vite-plugin-static-copy/dist/index.js";
var vite_config_default = defineConfig({
  base: "./",
  appType: "mpa",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html").map((filePath) => filePath.replace(/\\/g, "/")),
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: ({ name }) => {
          if (/\.(css|scss)$/.test(name)) {
            return "css/[name][extname]";
          } else if (/\.(png|jpe?g|svg|gif|json|webp)$/.test(name)) {
            return "images/[name][extname]";
          } else {
            return "assets/[name][extname]";
          }
        }
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./assets/images/**/*",
          dest: "assets/images"
        }
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdmVsaXphcmRlbHlhbm92L0Rlc2t0b3Ava3Jpc2lfd2Vic2l0ZS9rcmlzaXNpaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3ZlbGl6YXJkZWx5YW5vdi9EZXNrdG9wL2tyaXNpX3dlYnNpdGUva3Jpc2lzaWkvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3ZlbGl6YXJkZWx5YW5vdi9EZXNrdG9wL2tyaXNpX3dlYnNpdGUva3Jpc2lzaWkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN5bmMgfSBmcm9tICdnbG9iJztcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICBhcHBUeXBlOiAnbXBhJyxcbiAgcm9vdDogJy4vc3JjJyxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuLi9kaXN0JyxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogc3luYygnLi9zcmMvKiovKi5odG1sJykubWFwKChmaWxlUGF0aCkgPT4gZmlsZVBhdGgucmVwbGFjZSgvXFxcXC9nLCAnLycpKSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogYFtuYW1lXS5baGFzaF0uanNgLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogYFtuYW1lXS5baGFzaF0uanNgLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgaWYgKC9cXC4oY3NzfHNjc3MpJC8udGVzdChuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuICdjc3MvW25hbWVdW2V4dG5hbWVdJztcbiAgICAgICAgICB9IGVsc2UgaWYgKC9cXC4ocG5nfGpwZT9nfHN2Z3xnaWZ8anNvbnx3ZWJwKSQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW1hZ2VzL1tuYW1lXVtleHRuYW1lXSc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnLi9hc3NldHMvaW1hZ2VzLyoqLyonLFxuICAgICAgICAgIGRlc3Q6ICdhc3NldHMvaW1hZ2VzJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsc0JBQXNCO0FBRS9CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLE9BQU8sS0FBSyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYSxTQUFTLFFBQVEsT0FBTyxHQUFHLENBQUM7QUFBQSxNQUM3RSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUM1QixjQUFJLGdCQUFnQixLQUFLLElBQUksR0FBRztBQUM5QixtQkFBTztBQUFBLFVBQ1QsV0FBVyxtQ0FBbUMsS0FBSyxJQUFJLEdBQUc7QUFDeEQsbUJBQU87QUFBQSxVQUNULE9BQU87QUFDTCxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
