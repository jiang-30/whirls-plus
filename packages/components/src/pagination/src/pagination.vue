<template>
  <el-pagination
    v-model:current-page="props.pageModel.current"
    v-model:page-size="props.pageModel.size"
    :total="props.pageModel.total"
    v-bind="paginationAttrs"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePaginationAttrsFormatter } from "../../formatter/pagination";

type IPageModel = {
  current: number;
  size: number;
  total: number;
};

// const props = defineProps(buttonProps)
// const emit = defineEmits(buttonEmits)

const props = defineProps<{
  pageModel: IPageModel;
}>();
const emit = defineEmits<{
  (e: "change"): void;
  (e: "page-current-change"): void;
  (e: "page-size-change"): void;
}>();

const paginationAttrs = computed(() => {
  return usePaginationAttrsFormatter(props.pageModel);
});

/**
 * 当前页切换
 */
function onCurrentChange() {
  emit("page-current-change");
  emit("change");
}

/**
 * 数据量改变
 */
function onSizeChange() {
  props.pageModel.current = 1;
  props.pageModel.total = 0;
  emit("page-size-change");
  emit("change");
}
</script>
