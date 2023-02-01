<template>
  <ElDialog v-model="visible" title="试题" width="700px">
    <ElForm :model="formModel" :rules="formRules" label-position="right" label-width="100px">

      <ElFormItem label="试题类型" prop="type">
        <ElSelect class="w-full" v-model="formModel.type" @change="onTypeChange">
          <ElOption v-for="item in useDictStore().items('question_type')" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="试题内容" prop="title">
        <ElInput v-model="formModel.title" type="textarea" autosize placeholder="请输入题干内容"></ElInput>
      </ElFormItem>

       <!-- 单选 多选 -->
      <template v-if="formModel.type == '1' || formModel.type == '2'">
        <ElFormItem label="试题选项" prop="options">
          <div class="flex-1">
            <div class="flex items-center mb-2" v-for="(item, index) in formModel.options">
              <span class="w-[30px] shrink-0">{{ formatCapital(index) }}.</span>
              <ElInput v-model="formModel.options[index]" type="text" placeholder="请输入内容"></ElInput>
              <div class="w-[40px] text-right shrink-0">
                <ElButton  type="primary" circle plain size="small" :icon="Minus" @click="onRemove(index)"></ElButton>
              </div>
            </div>
            <div class="pl-[30px]">
              <ElButton class="w-full" type="primary" plain :icon="Plus" @click="onAdd"></ElButton>
            </div>
          </div>
        </ElFormItem>
      </template>

     
      <ElFormItem label="试题答案" prop="answer">
        <!-- 单选 -->
        <template v-if="formModel.type == '1'">
          <el-radio-group v-model="formModel.answer">
            <el-radio v-for="(item, index) in formModel.options" :key="item" :label="index">{{ formatCapital(index) }}</el-radio>
          </el-radio-group>
        </template>

        <!-- 多选 -->
        <template v-else-if="formModel.type == '2'">
          <el-checkbox-group v-model="formModel.answer">
            <el-checkbox v-for="(item, index) in formModel.options" :key="item" :label="index" >{{ formatCapital(index) }} </el-checkbox>
          </el-checkbox-group>
        </template>

        <!-- 判断 -->
        <template v-else-if="formModel.type == '3'">
          <el-radio-group v-model="formModel.answer">
            <el-radio v-for="(item, index) in formModel.options" :key="item" :label="index">{{ item }}</el-radio>
          </el-radio-group>
        </template>

        <!-- 填空 -->
        <template v-else-if="formModel.type == '4'">
          <ElInput  v-model="formModel.answer" type="text" placeholder="请输入试题答案"></ElInput>
        </template>

      </ElFormItem>


      <ElFormItem label="试题解析"  prop="analysis">
        <ElInput v-model="formModel.analysis" type="textarea" autosize placeholder="请输入试题解析"></ElInput>
      </ElFormItem>

    </ElForm>

    <template #footer>
      <ElButton type="primary" @click="onSubmit">保存</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import type { FormRules } from 'element-plus';
  import { Plus, Minus } from '@element-plus/icons-vue'
  import { useDictStore } from '@/stores'
  import { Question, type IQuestion } from '../index'

  const visible = ref(false)

  const formModel = ref<IQuestion>(new Question())

  const formRules: FormRules = {
    title: [
      { required: true, message: '请输入试题内容', trigger: 'blur'}
    ],
    options: [
      { required: true, message: '请输入试题选项', trigger: 'blur'}
    ],
    answer: [
      { required: true, message: '请输入试题答案', trigger: 'blur'}
    ],
    analysis: [
      { required: true, message: '请输入试题解析', trigger: 'blur'}
    ],
  }
  // 18748179420 董 猪肉

  const resetOptions = () => {
    if(formModel.value.type == '1' || formModel.value.type == '2') {
      formModel.value.options = ["", "", "", ""]
    } else if(formModel.value.type == '3') {
      formModel.value.options = ["是", "否"]
    } else {
      formModel.value.options = []
    }
  }
  
  const resetAnswer = () => {
    if(formModel.value.type == '2') {
      formModel.value.answer = []
    } else if(formModel.value.type == '4') {
      formModel.value.answer = ""
    } else {
      formModel.value.answer = 0
    }
  }

  const onTypeChange = (val: string) => {
    resetOptions()
    resetAnswer()
  }

  const onAdd = (index: number) => {
    formModel.value.options.push("");
  }
  const onRemove = (index: number) => {
    formModel.value.options.splice(index, 1);
    resetAnswer()
  }

  const onSubmit = () => {
    console.log(formModel.value)
  }


  const formatCapital = (num: number) => {
    return String.fromCharCode((65 + num))
  }

  const open = (val?: IQuestion) => {
    if(val) {
      formModel.value = val
    } else {
      formModel.value = new Question()
    }
    visible.value = true
  }

  defineExpose({
    open
  })
</script>