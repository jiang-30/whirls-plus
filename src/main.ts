import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import App from "./App.vue";

import WComponents from "@/packages/components/src/index";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(WComponents, { axios: { a: "bbbb" } });
app.mount("#app");
