module.exports = {
  files: ["./src/**/*.{css,vue}"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
    "stylelint-config-prettier",
  ],
  plugins: [],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer"],
      },
    ],
    "selector-class-pattern": [false, false],
    "value-keyword-case": [false], // 关键字大小写，fix有效，v-bind的值会被格式化
  },
};
