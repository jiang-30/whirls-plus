import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import WhirlCrud from "@whirls/components";
import "@whirls/components/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(WhirlCrud);
  },
};
