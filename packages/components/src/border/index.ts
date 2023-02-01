import { withInstall } from "@whirls/utils";
import Border from './src/border.vue'

Border.name = "WBorder"

export * from './src/border'
export const WBorder = withInstall(Border)

export default WBorder
