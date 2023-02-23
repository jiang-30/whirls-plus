import AutoImport from "unplugin-auto-import/vite";
import AutoComponents from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// import
// components
// iconify
export default function createAuto() {
  return [
    AutoImport({
      dts: "./auto-import.d.ts",

      // 自动导入 vue vue-router pinia
      imports: ["vue", "vue-router", "pinia"],

      resolvers: [
        // 导入 element-plus 中的依赖如: ElMessage
        ElementPlusResolver(),
      ],

      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
      // customCollections: {
      //   my: FileSystemIconLoader('src/assets/svg'),
      // },
    }),
    AutoComponents({
      // 自动生成声明文件的位置
      dts: "./auto-components.d.ts",

      // 自动引入自定义组件
      dirs: ["src/components"],
      include: [/\.vue$/],

      // 导入 vue 和 vue-router 中的组件
      extensions: ["vue", "vue-router"],

      resolvers: [
        // 按需导入时, 自动导入ElementPlus组件,
        ElementPlusResolver(),

        // 配合 unplugin-icons,直接使用 iconify
        // {prefix}-{collection}-{icon}
        IconsResolver({
          prefix: "icon",
          alias: {}, // 图标集名词简写
          // customCollections: ['base'], // 自定义图标集
        }),

        // 自定义组件名称
        // (name) => {
        //   if(name.startsWith('Bx')) {
        //     return {
        //       importName: name.slice(2),
        //       path: 'xx-ui'
        //     }
        //   }
        // }
      ],
    }),
  ];
}
