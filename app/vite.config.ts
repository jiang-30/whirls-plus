import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import { createVitePlugins } from "./vite/index";
import tailwindcss from "tailwindcss";
import { visualizer } from "rollup-plugin-visualizer";
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";

export default ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5190,
      proxy: {
        "/api": {
          target: env.VITE_APP_HTTP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss({ config: "./tailwind.config.cjs" })],
      },
    },
    build: {
      chunkSizeWarningLimit: 1000, // 包大小超过多少K有提示信息
      // cssCodeSplit: true, // css 文件也拆分
      // sourcemap: false,
      minify: "terser", // esbuild 速度快, terser 体积小
      assetsInlineLimit: 4000, // 小于4000 被编译成base64
      rollupOptions: {
        external: [],
        output: {
          // 分包, 自定义哪些文件打包到哪里 voctor
          manualChunks(filePath) {
            // console.log(filePath)
          },
        },
      },
    },
    plugins: [
      // 必备
      ...createVitePlugins(),
      // mock 读取 src/api 目录下的以 mock.ts 结尾的文件
      viteMockServe({
        localEnabled: false,
        logger: true,
        mockPath: "./src/api/",
        ignore(fileName) {
          return /.*mock.ts$/.test(fileName);
        },
      }),
      // .gzip 压缩
      viteCompression({
        verbose: false, // 控制台输出
        threshold: 20000, // 体积多少压缩, 单位 b
        disable: false, // 禁用
      }),
      // 查看包体积
      visualizer({ open: true }),
    ],
  });
};
