# 配置

## lang

语言

- Type: string
- Default: zh-CN

系统的语言, 会渲染在 index.html 中 `<html>` 标签的 lang 属性中

```js
{
  lang: "zh-CN";
}
```

## title

应用名称

- Type: string
- Default:

系统的语言, 会渲染在 index.html 中 `<title>` 标签中

```js
{
  title: "";
}
```

## description

应用描述

- Type: string
- Default:

系统的语言, 会渲染在 index.html 中 `<meta>` 标签中

```js
{
  description: "";
}
```

## keywords

应用关键字

- Type: string
- Default:

系统的语言, 会渲染在 index.html 中 `<meta>` 标签中

```js
{
  keywords: "";
}
```

## head

依赖的外部文件，如 js 和 css，系统的语言, 会渲染在 index.html 中 `<meta>` 标签中

- Type: string
- Default:

```js
// head?: [tag: string, Record<string, string>][]
{
  head: [["script", { src: "/static/tinymce/tinymce.min.js" }]];
}
```

## logo

页面 logo

- Type: string
- Default:

## clientCode

页面 logo

- Type: string
- Default:

## theme

主题配置

- Type: string
- Default:

## request

axios 请求配置

- Type: string
- Default:

## router

路由及权限配置

- Type: string
- Default:

## amap

地图配置

- Type: string
- Default:
