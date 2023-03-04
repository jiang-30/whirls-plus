<template>
  <el-popover
    placement="bottom-end"
    title="数据项"
    :width="600"
    trigger="click"
    :hide-after="0"
  >
    <template #default>
      <section>
        <el-checkbox-group :model-value="modelValue" @change="onChange">
          <el-checkbox
            v-for="item in fields"
            :key="item.prop"
            :label="item.prop"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </section>
    </template>
    <template #reference>
      <el-button circle :icon="Operation"></el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { Operation } from "@element-plus/icons-vue";
import type { PropType } from "vue";
import type { CheckboxGroupEmits } from "element-plus";
import type { ICrudColumnAttrs } from "./type";

type ITableFilterField = Pick<ICrudColumnAttrs, "prop" | "label">;

defineProps({
  modelValue: {
    type: Array as PropType<ITableFilterField["prop"][]>,
  },
  fields: {
    type: Array as PropType<ITableFilterField[]>,
  },
});

const emits = defineEmits({
  "update:modelValue": (val: string[]) => {
    if (Array.isArray(val)) {
      return true;
    } else {
      console.warn("参数不对");
      return false;
    }
  },
});

const onChange: CheckboxGroupEmits["change"] = (val) => {
  emits("update:modelValue", val as string[]);
  return true;
};
</script>
