<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 试题管理
  icon: mdi:file-question-outline
  layout: admin
  isTab: true
  parentName: Case
  isShow: true
  sort: 20
</route>

<template>
  <PageContainer>
    <ElButton type="primary" @click="onAdd">新增</ElButton>

    <el-table :data="tableList" border>
      <el-table-column
        label="序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column label="试题类型" prop="type" width="90" align="center">
        <template #default="{ row }">
          <ElTag>{{ useDictStore().filter(row.type, "question_type") }}</ElTag>
        </template>
      </el-table-column>
      <el-table-column label="试题内容" prop="title"></el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template #default="{ row }">
          <el-button link type="info" @click="onInfo(row)">详情</el-button>
          <el-button link type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button link type="warning">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <QuestionFormView ref="questionFormRef"></QuestionFormView>
    <QuestionInfoView ref="questionInfoRef"></QuestionInfoView>
  </PageContainer>
</template>

<script setup lang="ts">
import QuestionFormView from "./components/QuestionFormView.vue";
import QuestionInfoView from "./components/QuestionInfoView.vue";
import { useDictStore } from "@/stores";
import type { IQuestion } from "./index";

const questionFormRef = ref<typeof QuestionFormView>();
const questionInfoRef = ref<typeof QuestionInfoView>();
const tableList = ref<IQuestion[]>([
  {
    id: 1,
    type: "1",
    title:
      "一张3月份到期的执行价格为380美分/蒲式耳的玉米期货看跌期权，如果其标的玉米期货合约的价格为350美分/蒲式耳，权利金为35美分/蒲式耳，其内涵价值为（　　）美分/蒲式耳。",
    options: ["30", "0", "-5", "5"],
    answer: 0,
    analysis:
      "内涵价值是指在不考虑交易费用和期权费的情况下，买方立即执行期权合约可获取的行权收益，与权利金无关。看跌期权的内涵价值=执行价格-标的物的市场价格，则题中看跌期权的内涵价值=380-350=30（美分/蒲式耳）。",
  },
  {
    id: 2,
    type: "2",
    title:
      "一张3月份到期的执行价格为380美分/蒲式耳的玉米期货看跌期权，如果其标的玉米期货合约的价格为350美分/蒲式耳，权利金为35美分/蒲式耳，其内涵价值为（　　）美分/蒲式耳。",
    options: ["30", "0", "-5", "5"],
    answer: [1, 2],
    analysis:
      "内涵价值是指在不考虑交易费用和期权费的情况下，买方立即执行期权合约可获取的行权收益，与权利金无关。看跌期权的内涵价值=执行价格-标的物的市场价格，则题中看跌期权的内涵价值=380-350=30（美分/蒲式耳）。",
  },
  {
    id: 3,
    type: "3",
    title:
      "一张3月份到期的执行价格为380美分/蒲式耳的玉米期货看跌期权，如果其标的玉米期货合约的价格为350美分/蒲式耳，权利金为35美分/蒲式耳，其内涵价值为（　　）美分/蒲式耳。",
    options: ["是", "否"],
    answer: 0,
    analysis:
      "内涵价值是指在不考虑交易费用和期权费的情况下，买方立即执行期权合约可获取的行权收益，与权利金无关。看跌期权的内涵价值=执行价格-标的物的市场价格，则题中看跌期权的内涵价值=380-350=30（美分/蒲式耳）。",
  },
  {
    id: 4,
    type: "4",
    title:
      "一张3月份到期的执行价格为380美分/蒲式耳的玉米期货看跌期权，如果其标的玉米期货合约的价格为350美分/蒲式耳，权利金为35美分/蒲式耳，其内涵价值为（　　）美分/蒲式耳。",
    options: [],
    answer: "内涵价值是指在不考",
    analysis:
      "内涵价值是指在不考虑交易费用和期权费的情况下，买方立即执行期权合约可获取的行权收益，与权利金无关。看跌期权的内涵价值=执行价格-标的物的市场价格，则题中看跌期权的内涵价值=380-350=30（美分/蒲式耳）。",
  },
]);

const onAdd = () => {
  questionFormRef.value?.open();
};

const onInfo = (row: IQuestion) => {
  questionInfoRef.value?.open(row);
};

const onEdit = (row: IQuestion) => {
  questionFormRef.value?.open(row);
};
</script>
