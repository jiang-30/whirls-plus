import { fileURLToPath, URL } from "node:url";
import { ViteFaviconsPlugin } from "vite-plugin-favicon2";

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
