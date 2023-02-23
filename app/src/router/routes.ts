import generatedRoutes from "virtual:generated-pages";

// 全部启用路由
export const allRoutes = generatedRoutes;

// 静态路由
// 嵌套路由: 一级路由是, 子级路由不是
export const constantRoutes = generatedRoutes.filter(
  (item) => item.meta?.isStatic
);
