/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgba(var(--el-color-primary-rgb), <alpha-value>)",
          dark: "var(--el-color-primary-dark-2)",
          light: "var(--el-color-primary-light-3)",
          lighter: "var(--el-color-primary-light-5)",
        },
        success: "rgba(var(--el-color-success-rgb), <alpha-value>)",
        warning: "rgba(var(--el-color-warning-rgb), <alpha-value>)",
        danger: "rgba(var(--el-color-danger-rgb), <alpha-value>)",
        error: "rgba(var(--el-color-error-rgb), <alpha-value>)",
        info: "rgba(var(--el-color-info-rgb), <alpha-value>)",
      },
    },
  },
  plugins: [
    // element-plus 和 tailwindcss button 样式冲突
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))",
        },
      });
    },
  ],
};
