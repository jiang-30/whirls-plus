// 'element-plus/theme-chalk/dark/css-vars.css'

export function setThemePrimaryColor(primaryColor: string, mode: string) {
  const el = document.documentElement;
  const primaryTheme = generateThemeScheme(primaryColor, mode);

  Object.keys(primaryTheme).forEach((key) => {
    el.style.setProperty(key, primaryTheme[key]);
  });
}

// 生成主题色
export function generateThemeScheme(primaryColor: string, mode: string) {
  const prefixKey = "--el-color-primary";
  let scheme: Record<string, string> = {
    // '--el-color-black': '#000000',
    // '--el-color-white': '#FFFFFF',
    // '--el-color-blank': 'transparent',
    // ...extraScheme[mode]
  };
  if (mode == "dark") {
    const primaryTheme = generateDarkColor(primaryColor, prefixKey);
    scheme = {
      ...primaryTheme,
      [`${prefixKey}-rgb`]: colorH(primaryTheme[prefixKey]),
    };
  } else {
    const primaryTheme = generateLightColor(primaryColor, prefixKey);
    scheme = {
      ...primaryTheme,
      [`${prefixKey}-rgb`]: colorH(primaryTheme[prefixKey]),
    };
  }

  return scheme;
}

/** 颜色混合 */
function colorMix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);

  return (
    "#" +
    ("0" + (r || 0).toString(16)).slice(-2) +
    ("0" + (g || 0).toString(16)).slice(-2) +
    ("0" + (b || 0).toString(16)).slice(-2)
  );
}

/** 颜色格式转换 */
function colorH(color: string) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  return `${r},${g},${b}`;
}

function generateLightColor(
  primaryColor: string,
  prefix = "--el-color-primary"
) {
  const themeObj: Record<string, string> = {};
  themeObj[prefix] = primaryColor;
  for (let i = 1; i < 10; i += 1) {
    if (i == 2) {
      themeObj[`${prefix}-dark-${i}`] = colorMix(
        "#000000",
        primaryColor,
        1 - i * 0.1
      );
    } else {
      themeObj[`${prefix}-light-${i}`] = colorMix(
        "#ffffff",
        primaryColor,
        1 - i * 0.1
      );
    }
  }
  return themeObj;
}

function generateDarkColor(
  primaryColor: string,
  prefix = "--el-color-primary"
) {
  const themeObj: Record<string, string> = {};
  themeObj[prefix] = primaryColor;
  for (let i = 1; i < 10; i += 1) {
    if (i == 2) {
      themeObj[`${prefix}-dark-${i}`] = colorMix(
        "#ffffff",
        primaryColor,
        1 - i * 0.1
      );
    }
    themeObj[`${prefix}-light-${i}`] = colorMix(
      "#141414",
      primaryColor,
      1 - i * 0.1
    );
  }
  return themeObj;
}

// const extraScheme = {
//   dark: {
//     '--el-box-shadow': '0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px rgba(0, 0, 0, 0.72)',
//     '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, 0.72)',
//     '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, 0.72)',
//     '--el-box-shadow-dark': '0px 16px 48px 16px rgba(0, 0, 0, 0.72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000',
//   },
//   light: {
//     '--el-box-shadow': '0px 12px 32px 4px rgba(0, 0, 0, 0.04),0px 8px 20px rgba(0, 0, 0, 0.08)',
//     '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, 0.12)',
//     '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, 0.12)',
//     '--el-box-shadow-dark':
//       '0px 16px 48px 16px rgba(0, 0, 0, 0.08),0px 12px 32px rgba(0, 0, 0, 0.12),0px 8px 16px -8px rgba(0, 0, 0, 0.16)',
//   },
// }

// const themeScheme = {
//   dark: {
//     '--el-bg-color-page': '#0a0a0a',
//     '--el-bg-color': '#141414',
//     '--el-bg-color-overlay': '#1d1e1f',

//     '--el-text-color-primary': '#E5EAF3',
//     '--el-text-color-regular': '#CFD3DC',
//     '--el-text-color-secondary': '#A3A6AD',
//     '--el-text-color-placeholder': '#8D9095',
//     '--el-text-color-disabled': '#6C6E72',

//     '--el-border-color-darker': '#636466',
//     '--el-border-color-dark': '#58585B',
//     '--el-border-color': '#4C4D4F',
//     '--el-border-color-light': '#414243',
//     '--el-border-color-lighter': '#363637',
//     '--el-border-color-extra-light': '#2B2B2C',

//     '--el-fill-color-darker': '#424243',
//     '--el-fill-color-dark': '#39393A',
//     '--el-fill-color': '#303030',
//     '--el-fill-color-light': '#262727',
//     '--el-fill-color-lighter': '#1D1D1D',
//     '--el-fill-color-extra-light': '#191919',
//     '--el-fill-color-blank': 'transparent',
//   },

//   light: {
//     '--el-bg-color-page': '#F2F3F5',
//     '--el-bg-color': '#FFFFFF',
//     '--el-bg-color-overlay': '#FFFFFF',

//     '--el-text-color-primary': '#303133',
//     '--el-text-color-regular': '#606266',
//     '--el-text-color-secondary': '#909399',
//     '--el-text-color-placeholder': '#A8ABB2',
//     '--el-text-color-disabled': '#C0C4CC',

//     '--el-border-color-darker': '#CDD0D6',
//     '--el-border-color-dark': '#D4D7DE',
//     '--el-border-color': '#DCDFE6',
//     '--el-border-color-light': '#E4E7ED',
//     '--el-border-color-lighter': '#EBEEF5',
//     '--el-border-color-extra-light': '#F2F6FC',

//     '--el-fill-color-darker': '#E6E8EB',
//     '--el-fill-color-dark': '#EBEDF0',
//     '--el-fill-color': '#F0F2F5',
//     '--el-fill-color-light': '#F5F7FA',
//     '--el-fill-color-lighter': '#FAFAFA',
//     '--el-fill-color-extra-light': '#FAFCFF',
//     '--el-fill-color-blank': '#FFFFFF',
//   },
// }

// --el-color-primary-rgb: 64,158,255;
// --el-color-success-rgb: 103,194,58;
// --el-color-warning-rgb: 230,162,60;
// --el-color-danger-rgb: 245,108,108;
// --el-color-error-rgb: 245,108,108;
// --el-color-info-rgb: 144,147,153;

// --el-color-primary: #409eff;
// --el-color-success: #67c23a;
// --el-color-warning: #e6a23c;
// --el-color-danger: #f56c6c;
// --el-color-error: #f56c6c;
// --el-color-info: #909399;
// --el-color-primary-dark: ;
// --el-color-primary: ;
// --el-color-primary-base: ;
// --el-color-primary-light: ;
// --el-color-primary-lighter: ;
// --el-color-primary-extra-light: ;

// --el-color-black: #000000;
// --el-color-white: #FFFFFF;
// --el-color-blank: transparent;

// /** 0px 12px 32px 4px rgba(0, 0, 0, 0.04),0px 8px 20px rgba(0, 0, 0, 0.08); */
// --el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px rgba(0, 0, 0, 0.72);
// /** 0px 0px 12px rgba(0, 0, 0, 0.12) */
// --el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.72);
// /** 0px 0px 6px rgba(0, 0, 0, 0.12) */
// --el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.72);
// /** 0px 16px 48px 16px rgba(0, 0, 0, 0.08),0px 12px 32px rgba(0, 0, 0, 0.12),0px 8px 16px -8px rgba(0, 0, 0, 0.16) */
// --el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000;

// --el-bg-color-page: #0a0a0a; /** #F2F3F5 */
// --el-bg-color: #141414; /** #FFFFFF */
// --el-bg-color-overlay: #1d1e1f; /** #FFFFFF */

// --el-text-color-primary: #E5EAF3; /** #303133 */
// --el-text-color-regular: #CFD3DC; /** #606266 */
// --el-text-color-secondary: #A3A6AD; /** #909399 */
// --el-text-color-placeholder: #8D9095; /** #A8ABB2 */
// --el-text-color-disabled: #6C6E72; /** #C0C4CC */

// --el-border-color-darker: #636466; /** #CDD0D6 */
// --el-border-color-dark: #58585B; /** #D4D7DE */
// --el-border-color: #4C4D4F; /** #DCDFE6 */
// --el-border-color-light: #414243; /** #E4E7ED */
// --el-border-color-lighter: #363637; /** #EBEEF5 */
// --el-border-color-extra-light: #2B2B2C; /** #F2F6FC */

// --el-fill-color-darker: #424243; /** #E6E8EB */
// --el-fill-color-dark: #39393A; /** #EBEDF0 */
// --el-fill-color: #303030; /** #F0F2F5 */
// --el-fill-color-light: #262727; /** #F5F7FA */
// --el-fill-color-lighter: #1D1D1D; /** #FAFAFA */
// --el-fill-color-extra-light: #191919; /** #FAFCFF */
// --el-fill-color-blank: transparent; /** #FFFFFF */
