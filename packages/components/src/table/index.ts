import { withInstall } from "@whirls/utils";
import Table from "./src/table.vue";

Table.name = "WTable";

export * from "./src/type";
export const WTable = withInstall(Table);
export default WTable;
