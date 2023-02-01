import type { App } from "vue";

import { WButton } from "./button/index";
import { WSection } from './section/index';
import { WTable } from "./table/index";

export { WButton, WTable, WSection };

export default {
  install: (app: App) => {
    app.use(WButton);
    app.use(WSection);
    app.use(WTable);
  },
};
