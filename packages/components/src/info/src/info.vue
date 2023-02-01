<template>
  <el-descriptions v-bind="infoAttrs">
    <template v-for="item in infoFields" :key="item.prop">
      <el-descriptions-item v-bind="item.__infoItemAttrs">
        <template #label>
          <span>{{ item.label }}</span>
        </template>
        <template #default>
          <span>{{ model[item.prop] }}</span>
        </template>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import {
  useInfoAttrsFormatter,
  useInfoFieldsFormatter,
} from "../../formatter/info";

const props = withDefaults(
  defineProps<{
    option: any;
    model: any;
  }>(),
  {}
);

console.log("22343423423", props.model);

const infoAttrs = computed(() => {
  return useInfoAttrsFormatter(props.option);
});

const infoFields = computed(() => {
  return useInfoFieldsFormatter(props.option);
});
</script>
