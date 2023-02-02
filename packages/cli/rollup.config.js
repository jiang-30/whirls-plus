import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
// @rollup/plugin-terser

export default {
  plugins: [
    typescript({
      strict: false,
      noImplicitAny: false,
      noEmitOnError: true,
      allowJs: true,
    }),
    commonjs(),
    json(),
  ],
  input: "src/index.ts",
  output: [
    {
      format: "es",
      dir: "dist",
      entryFileNames: "[name].js",
    },
  ],
};
