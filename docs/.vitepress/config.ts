import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Whirls",
  description: "Whirls",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/logo.png",
    footer: {
      // message: '其实我也不知道写啥注脚',
      copyright: "随便写一个吧",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    nav: [
      { text: "在线预览", link: "https://admin.whirls.jiangbo.fun/" },
      { text: "指南", link: "/guide/quickstart" },
      {
        text: "组件",
        link: "/component/crud"
      },
      { text: "脚手架", link: "/cli/" },
      { text: "配置", link: "/config/" },
      { text: "进阶", link: "/advance/overview" },
      {
        text: "版本",
        items: [
          { text: "版本 v3", link: "https://www.baidu.com/" },
          { text: "版本 v2", link: "https://www.baidu.com/" },
          { text: "版本 v1", link: "https://www.baidu.com/" },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "介绍", link: "/guide/introduction" },
            { text: "快速开始", link: "/guide/quickstart" },
            { text: "更新日志", link: "/guide/changelog" },
          ],
        },
      ],
      "/component/": [
        {
          text: "",
          items: [
            { text: "CRUD组件", link: "/component/crud" },
            { text: "Table组件", link: "/component/table" },
            { text: "Form组件", link: "/component/form" },
            { text: "Info组件", link: "/component/info" },
            { text: "Button 按钮", link: "/component/button" },
            { text: "Roll 滚动", link: "/component/roll" },
          ],
        },
      ],
      "/advance/": [
        {
          text: "进阶",
          items: [
            { text: "概览", link: "/advance/overview" },
            { text: "路由及菜单", link: "/advance/router" },
            { text: "状态管理", link: "/advance/store" },
            { text: "网络请求", link: "/advance/request" },
            { text: "权限", link: "/advance/authority" },
            { text: "样式", link: "/advance/style" },
            { text: "图标", link: "/advance/icon" },
            { text: "TS类型", link: "/advance/type" },
          ],
        },
        {
          text: "工程化",
          items: [
            { text: "代码风格", link: "/advance/lint" },
            { text: "部署", link: "/advance/deploy" },
            { text: "性能", link: "/advance/performance" },
            { text: "监控", link: "/advance/monitoring" },
          ],
        },
        {
          text: "扩展",
          items: [
            { text: "功能函数", link: "/advance/utils" },
            { text: "解决方案", link: "/advance/solution" },
            { text: "其他", link: "/advance/other" },
          ],
        },
      ],
    },
  },
});
