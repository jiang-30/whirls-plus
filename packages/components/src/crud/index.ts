import { withInstall } from "@whirls/utils";
import Crud from "./src/crud.vue";
export * from "./src/type";

const WCrud = withInstall(Crud);

export { WCrud, WCrud as default };
