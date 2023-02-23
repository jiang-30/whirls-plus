import { withInstall } from "@whirls/utils";
import Form from "./src/form.vue";
import FormSearch from "./src/form-search.vue";

Form.name = "WForm";
FormSearch.name = "WFormSearch";

export * from "./src/type";
export const WForm = withInstall(Form);
export const WFormSearch = withInstall(FormSearch);

export default WForm;
