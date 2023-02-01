
import vue from '@vitejs/plugin-vue'
import createHtml from './html'
import createOptions from './options'
import createPages from './pages'
import createAuto from './auto'
import createLint from './lint'

// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
//  * vite-plugin-banner 当你在你的项目上运行 npm run build 打包的时候，在 dist 文件夹（或者你在 vite.config.ts 配置的其他 build.outDir ），除了 vendor 文件外，所有的 js 和 css 文件都会添加一个 banner 注释在文件顶部。
//  * vite-plugin-html
//  * vite-plugin-mock
//  * vite-plugin-vue-layouts
//  * vite-plugin-pages
//  * vite-plugin-vue-setup-extend
//  * vite-plugin-compression
//  * vite-plugin-spritesmith
//  * @vitejs/plugin-legacy 打包后的文件提供传统浏览器兼容性
//  * vite-plugin-restart
//  *     // 打包 .gz 文件 vite-plugin-compression
// viteCompression({
//   verbose: true,
//   disable: false,
//   threshold: 10240,
//   algorithm: 'gzip',
//   ext: '.gz'
// })
//

export function createVitePlugins() {
  return [
    vue(),
    createHtml(), 
    ...createLint(), 
    ...createOptions(), 
    ...createAuto(), 
    ...createPages()
  ]
}
