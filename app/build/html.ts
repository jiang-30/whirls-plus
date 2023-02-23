import { createHtmlPlugin } from 'vite-plugin-html'
import appConfig from '../src/app.config'

export default function createHtml() {
  const headTags: any[] = []
  appConfig.head?.forEach(item => {
    headTags.push({
      injectTo: 'head',
      tag: <string>item[0],
      attrs: <Record<string, string | boolean | undefined>>item[1],
    })
  })

  const html = createHtmlPlugin({
    minify: true,

    /**
     * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
     * @default src/main.ts
     */
    // entry: 'src/main.ts',

    /**
     * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
     * @default index.html
     */
    // template: 'public/index.html',

    /**
     * 需要注入 index.html ejs 模版的数据
     * data 注入的数据可以在 html 中使用 ejs 模版语法获取, ejsOptions: ejs 配置项EJSOptions, tags 需要注入的标签列表
     * 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
     */
    inject: {
      data: {
        lang: appConfig?.lang ?? 'zh-CN',
        title: appConfig.title,
        description: appConfig.description,
        keyworks: appConfig.keyworks
      },
      tags: [
        ...headTags
      ],
    },
  })

  return html
}
