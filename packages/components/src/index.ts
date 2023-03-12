import type { Plugin } from "vue";
import type { AxiosInstance } from "axios";

export * from "./button/index";
export * from "./info/index";
export * from "./form/index";
export * from "./crud/index";
export * from "./roll/index";

import { tools } from "./utils";
import { WButton } from "./button/index";
import { WInfo } from "./info/index";
import { WForm, WSearchForm } from "./form/index";
import { WCrud } from "./crud/index";
import { WSection } from "./section/index";
import { WRoll } from "./roll/index";

export default <Plugin<{ axios?: AxiosInstance }>>{
  install: (app, option) => {
    if (option.axios) {
      tools.axios = option.axios;
    }

    app.use(WButton);
    app.use(WInfo);
    app.use(WForm);
    app.use(WSearchForm);
    app.use(WCrud, option);
    app.use(WSection);
    app.use(WRoll);
  },
};
