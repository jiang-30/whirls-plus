import { fileURLToPath, URL } from "node:url";
import { ViteFaviconsPlugin } from "vite-plugin-favicon2";

// TODO: 路径通过传参来获取， 现在是 cwd 路径
// 自动引入favicon
export default function createFavicon() {
  const logoPath = fileURLToPath(
    new URL("../public/static/images/logo.png", import.meta.url)
  );
  return [
    ViteFaviconsPlugin({
      logo: logoPath,
      inject: false,
    }),
  ];
}
