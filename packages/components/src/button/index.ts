import { withInstall } from "@whirls/utils";
import Button from "./src/button.vue";

Button.name = "WButton";

export * from "./src/button";
export const WButton = withInstall(Button);
export default WButton;
