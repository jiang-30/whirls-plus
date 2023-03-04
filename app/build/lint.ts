import stylelint from "vite-plugin-stylelint";
import eslint from "vite-plugin-eslint";

export default function createLint() {
  return [
    // stylelint({
    //   cache: false,
    //   fix: true,
    // }),
    // eslint({
    //   cache: false,
    //   fix: true,
    //   lintOnStart: false,
    // }),
  ];
}
