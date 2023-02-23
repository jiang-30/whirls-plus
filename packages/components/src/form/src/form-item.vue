<template>
  <el-form-item :prop="field.prop" v-bind="field._attrs">
    <template #label>
      <span>{{ field.label }}</span>
      <template v-if="field.hint">
        <el-tooltip placement="top" :content="field.hint">
          <i>i</i>
        </el-tooltip>
      </template>
    </template>

    <template #default>
      <!-- input、textarea、password -->
      <el-input
        v-if="['input', 'textarea', 'password'].includes(field.type)"
        v-model="formModel[field.prop]"
        :type="field.type"
        :placeholder="'请输入' + field.label"
      ></el-input>

      <!-- inputNumber 数字输入框 -->
      <el-input-number
        v-else-if="field.type === 'inputNumber'"
        v-model="formModel[field.prop]"
      />

      <!-- select -->
      <el-select
        v-else-if="field.type === 'select'"
        v-model="formModel[field.prop]"
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
        v-model="formModel[field.prop]"
      >
        <el-radio v-for="item in field.__dictData" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>

      <!-- radioButton -->
      <el-radio-group
        v-else-if="field.type === 'radioButton'"
        v-model="formModel[field.prop]"
      >
        <el-radio-button v-for="item in field.__dictData" :label="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>

      <!-- cascader 级联选择 -->
      <el-cascader
        v-else-if="field.type === 'cascader'"
        v-model="formModel[field.prop]"
        :options="field.__dictData"
      />

      <!-- tree 树型选择 -->
      <el-tree-select
        v-else-if="field.type === 'treeSelect'"
        v-model="formModel[field.prop]"
        :data="field.__dictData"
        v-bind="field.__formControlAttrs"
      />
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
defineProps({
  field: {
    type: Object,
    required: true,
  },
  formModel: {
    type: Object,
    required: true,
  },
});
</script>
