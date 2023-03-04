import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import defineOptions from "unplugin-vue-define-options/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    defineOptions(),
    dts({
      // 指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: "./tsconfig.json",
      outputDir: "es",
      entryRoot: "./src",
      staticImport: true,
    }),
  ],
  build: {
    target: "modules",
    // 打包文件目录
    outDir: "dist",
    // chunkSizeWarningLimit: 1000, // 包大小超过多少K有提示信息
    // cssCodeSplit: true, // css 文件也拆分
    // sourcemap: false,
    // minify: 'terser', // esbuild 速度快, terser 体积小
    // assetsInlineLimit: 4000, // 小于4000 被编译成base64
    // 压缩
    minify: false,
    // css分离
    // cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    // sourcemap: true,
    lib: {
      entry: "./src/index.ts",
      name: "WhirlComponents",
    },
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue", "element-plus"],
      output: [
        {
          format: "umd",
          name: "WhirlComponents",
          exports: "named",
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].umd.js",
          // 让打包目录和我们目录对应
          // preserveModules: true,
          // 配置打包根目录
          dir: "dist",
          // preserveModulesRoot: "src",
        },
        {
          format: "es",
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].mjs",
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: "es",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          exports: "named",
          entryFileNames: "[name].js",
          // 配置打包根目录
          dir: "lib",
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 输入模块的目录路径，应该从输出中剥离。Dir输出路径。保存模块的值为true。
          preserveModulesRoot: "src",
        },
      ],
    },
  },
});
