<template>
  <!-- select -->
  <el-select
    v-if="field.type === 'select'"
    v-model="formData[field.prop]"
    :placeholder="'请选择' + field.label"
  >
    <el-option
      v-for="item in field.__dictData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <!-- radio -->
  <el-radio-group
    v-else-if="field.type === 'radio'"
    v-model="formData[field.prop]"
  >
    <el-radio v-for="item in field.__dictData" :label="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>

  <!-- radioButton -->
  <el-radio-group
    v-else-if="field.type === 'radioButton'"
    v-model="formData[field.prop]"
  >
    <el-radio-button v-for="item in field.__dictData" :label="item.value">{{
      item.label
    }}</el-radio-button>
  </el-radio-group>

  <!-- cascader 级联选择 -->
  <el-cascader
    v-else-if="field.type === 'cascader'"
    v-model="formData[field.prop]"
    :options="field.__dictData"
  />

  <!-- tree 树型选择 -->
  <el-tree-select
    v-else-if="field.type === 'treeSelect'"
    v-model="formData[field.prop]"
    :data="field.__dictData"
    v-bind="field.__formControlAttrs"
  />

  <!-- inputNumber 数字输入框 -->
  <el-input-number
    v-else-if="field.type === 'inputNumber'"
    v-model="formData[field.prop]"
  />

  <!-- textarea -->
  <el-input
    v-else-if="field.type === 'textarea'"
    v-model="formData[field.prop]"
    type="textarea"
    :placeholder="'请输入' + field.label"
    :autosize="{ minRows: 2 }"
  ></el-input>

  <!-- textarea -->
  <el-input
    v-else-if="field.type === 'password'"
    v-model="formData[field.prop]"
    type="password"
    :placeholder="'请输入' + field.label"
    :autosize="{ minRows: 2 }"
  ></el-input>

  <TinymceEditor
    v-else-if="field.type === 'richText'"
    v-model="formData[field.prop]"
    :placeholder="'请输入' + field.label"
  ></TinymceEditor>

  <!-- input -->
  <el-input
    v-else
    v-model="formData[field.prop]"
    :placeholder="'请输入' + field.label"
  ></el-input>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
// import TinymceEditor from '../../editor/TinymceEditor.vue'

const { field, formData } = withDefaults(
  defineProps<{
    field: any;
    formData: { [key: string]: any };
  }>(),
  {}
);
</script>
