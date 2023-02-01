<template>
  <ElDialog v-model="visible" title="试题" width="700px">
    <section class="p-3">
      <header>
        <ElTag>{{ useDictStore().filter(formModel.type, 'question_type') }}</ElTag>
        <span class="ml-2 text-base font-medium text-gray-800">{{ formModel.title }}</span>
      </header>

      <main class="p-2" v-if="['1', '2', '3'].includes(formModel.type)">
        <div class="mb-1" v-for="(item, index) in formModel.options">
          <span class="mr-2 text-base font-medium">{{ formatCapital(index) }}.</span>
          <span>{{ item }}</span>
        </div>
      </main>
    </section>
    <template #footer>
      <ElButton type="primary" @click="detailVisible = true">解析</ElButton>
    </template>


    <ElDialog v-model="detailVisible" title="解析" width="500px" append-to-body>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="答案">{{ _answer }}</el-descriptions-item>
        <el-descriptions-item label="解析">{{ formModel.analysis }}</el-descriptions-item>
      </el-descriptions>
    </ElDialog>
    
  </ElDialog>
</template>

<script setup lang="ts">
  import { useDictStore } from '@/stores'

  type IQuestion = {
    id?: number
    type: string
    title: string
    options: string[]
    answer: number | number[] | string
    analysis: string
  }

  const visible = ref(false)
  const detailVisible = ref(false)

  const formModel = ref<IQuestion>({
    type: "1",
    title: "",
    options: ["", "", "", ""],
    answer: 0,
    analysis: '',
  })

  const formatCapital = (num: number) => {
    return String.fromCharCode((65 + num))
  }

  const _answer = computed(() => {
    if(formModel.value.type == '1' || formModel.value.type == '3') {
      return formatCapital(<number>formModel.value.answer)
    } else if(formModel.value.type == '2') {
      return (formModel.value.answer as number[]).map(item => formatCapital(item)).join(',')
    } else {
      return formModel.value.answer
    }
  })


  const open = (value: IQuestion) => {
    formModel.value = value
    visible.value = true
  }

  defineExpose({
    open
  })
  
</script>