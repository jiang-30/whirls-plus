import type { App } from "vue";

export * from "./crud/index";
export * from "./form/index";

import { WButton } from "./button/index";
import { WSection } from "./section/index";
import { WTable } from "./table/index";
import { WForm } from "./form/index";
import { WFormSearch } from "./form/index";
import { WCrud } from "./crud/index";
import { WRoll } from "./roll/index";

export const tools = {
  axios: null,
};

export { WButton, WTable, WForm, WFormSearch, WSection, WRoll, WCrud };

export default {
  install: (app: App, option: any) => {
    tools.axios = option.axios;

    app.use(WButton);
    app.use(WSection);
    app.use(WTable);
    app.use(WForm);
    app.use(WFormSearch);
    app.use(WCrud, option);
    app.use(WRoll);
  },
};
