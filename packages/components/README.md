## TODO
- async-validator 类型为引入问题
- v-model:table-data
- v-model:table-loading
- api
- before-open
- before-close
- before-save
- 角色 ADMIN, 超级管理员 isAdmin
- dict code name items(label value disabled, remark), 通过code查询和全部查询

## 思路

- 数据结构的组装
- 组件列表的选择
- 组件的拖拽处理
- 组件的属性配置
- 请求的处理
- 下拉选项数据的处理
- table 组件的设计
- 按钮与弹窗的处理
- 弹窗与表格数据的联动
- 自定义插槽

组件列表 | 配置展示区 | 属性配置区

component {
type: string = "componentName"
properties:Record<string, any> = {}
children: Record<string, any>[] = []
}

```ts
const pageConfig = {
  type: "page",
  properties: {},
  search: {
    type: "search",
    id: "",
    properties: {},
    children: [
      {
        type: "input",
        id: "",
        properties: {},
      },
    ],
  },
  table: {
    type: "table",
    id: "",
    properties: {},
    children: [
      {
        type: "column",
        id: "",
        properties: {},
      },
    ],
    buttons: [
      {
        type: "button",
        id: "",
        properties: {},
      },
    ],
  },
};
```

```ts
interface IButtonConfig {
  type: "弹窗" | "确认提示框" | "请求" | "跳转" | "下载";
  key: "";
  attrs: {};
}

interface IInputAttrs {
  placeholder: string;
  clearable: boolean;
}

interface IFieldConfig {
  type: "input" | "select" | "data" | "checkbox" | "button";
  key: "";
  attrs: {};
}

interface IColumnConfig {
  type: "column | ";
  key: "";
  attrs: {};
  children: IButtonConfig[];
}

interface ISearchConfig {
  type: "search";
  key: string;
  attrs: {
    gutter: number;
    searchBtnText: "查询";
    searchBtnIcon: "search";
    resetBtnText: "重置";
    resetBtnIcon: "refresh";
    round?: boolean;
  };
  children: IFieldConfig[];
}

interface ITableConfig {
  type: "table";
  key: string;
  attrs: {};
  buttons: IButtonConfig[]; // 上传、新增、批量删除、批量选择。
  children: IColumnConfig[]; // selection、default、operate[button、switch]
}
interface IDialogConfig {
  type: "dialog";
  key: string;
  attrs: {};
  buttons: [];
  children: [];
}

interface IPageConfig {
  attrs: {};
  search: ISearchConfig;
  table: ITableConfig;
  fields: IFieldConfig[];
  dialogs: IDialogConfig[];
}
```

- 每一个组件的配置信息都不一样（共有：prop）
- 一个组件依赖其他组件的属性值
  rules: {
  {originKey: 'type', destValue: ['url']}
  }
- 组件在不通过的父级组件下有不同的属性
  配置属性中：use: ['search', 'dialog']
- 请求
- 下拉选项数据处理
- 弹窗，通过弹窗 button 中 dialogId 关联 dialogKey

## crud

配置

```js

{
  type: 'el-input',
  label: '名称',
  prop: 'name',
  value: '', // 默认值
  options: {
    vIf: [

      {ralationProp: 'area', value: 'area'}
    ]
  }
}
```

render 函数
···js
createVNode()
···

## file-saver

客户端保存文件的解决方案

如果文件来自服务器，我们建议您首先尝试使用 Content-Disposition 附件响应标头，因为它具有更多的跨浏览器兼容性
如果您需要保存大于 blob 大小限制的非常大的文件或没有足够的 RAM，请查看更高级的 StreamSaver.js

```js
// npm install file-saver --save
// npm install @types/file-saver --save-dev

// Blob  Blob.js
var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
FileSaver.saveAs(blob, "hello world.txt");

var file = new File(["Hello, world!"], "hello world.txt", {
  type: "text/plain;charset=utf-8",
});
FileSaver.saveAs(file);

// canvas-toBlob.js
canvas.toBlob(function (blob) {
  saveAs(blob, "pretty image.png");
});

FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

## preview

- word(docx): mammoth、docx-preview
- powerpoint(ppt): pptxjs
- excel(zlsx): sheetjs、handsontable、exceljs
- pdf(pdf): pdfjs pdfjs-dist
- img(): v-viewer、PhotoSwipe

## crud

配置 lib 对应的 vite.config.ts
保留环境配置参数，为以后业务组件多环境预留
vite-plugin-dts 提取 ts 文件
最后输出 es，umd 打包文件
