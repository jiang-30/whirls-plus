import type { ExtractPropTypes } from "vue";
import type Roll from "./roll.vue";
import type { rollProps } from "./roll";

export type RollProps = ExtractPropTypes<typeof rollProps>;

export type RollInstance = InstanceType<typeof Roll>;
