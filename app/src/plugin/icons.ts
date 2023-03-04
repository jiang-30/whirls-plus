import { addCollection } from "@iconify/vue";
import icons from "@/assets/icon/index";

// 自定义图标集合; 不会缓存,会随项目打包
// 集合名词为 w, 图标名称icons中的可以值; 使用 w:icon
addCollection({
  prefix: "w",
  icons: icons,
  left: 0,
  top: 0,
  width: 24,
  height: 24,
});
