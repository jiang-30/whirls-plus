import { withInstall } from "@whirls/utils";
export * from "./src/type";
import Crud from "./src/crud.vue";

Crud.name = "WCrud";

export const WCrud = withInstall(Crud);
