declare module "@vue/runtime-core" {
  // 全局组件
  export interface GlobalComponents {
    WInfo: typeof import("@whirls/components")["WInfo"];
    WForm: typeof import("@whirls/components")["WForm"];
    WSearchForm: typeof import("@whirls/components")["WSearchForm"];
    WCrud: typeof import("@whirls/components")["WCrud"];
  }

  // // 全局属性
  // interface ComponentCustomProperties {
  //   // $message: typeof import("element-plus")["ElMessage"];
  // }
}

export {};
