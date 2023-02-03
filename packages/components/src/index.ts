import type { App } from "vue";

import { WButton } from "./button/index";
import { WSection } from "./section/index";
import { WTable } from "./table/index";
import { WRoll } from "./roll/index";

export { WButton, WTable, WSection, WRoll };

export default {
  install: (app: App) => {
    app.use(WButton);
    app.use(WSection);
    app.use(WTable);
    app.use(WRoll);
  },
};
