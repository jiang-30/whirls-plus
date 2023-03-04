<template>
  <section>
    <el-descriptions v-bind="__infoAttrs" :column="24">
      <el-descriptions-item
        v-for="item in __infoFields"
        :key="item.prop"
        v-bind="item.__itemAttrs"
        :span="item.span"
      >
        <template #label>
          <span>{{ item.label }}</span>
        </template>
        <template #default>
          <span>{{ infoModel[item.prop] }}</span>
        </template>
      </el-descriptions-item>
    </el-descriptions>

    <footer class="w-info-footer">
      <el-button
        v-if="onCancel"
        type="default"
        :icon="CircleClose"
        @click="_onCancel"
      >
        关闭
      </el-button>
    </footer>
  </section>
</template>
<script lang="ts" setup>
import { CircleClose } from "@element-plus/icons-vue";
import { infoProps, infoEmits } from "./info";
import { useInfoOption } from "./utils";

defineOptions({ name: "WInfo" });
const props = defineProps(infoProps);
const emits = defineEmits(infoEmits);

const { __infoAttrs, __infoFields } = useInfoOption(props.option);

const _onCancel = () => {
  if (props.onCancel) {
    props.onCancel();
  }
};
</script>

<style scoped>
.w-info-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
