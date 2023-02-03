<template>
  <section style="height: 60px">
    <WRoll :title="title" :list="list"></WRoll>
  </section>
</template>

<script setup lang="ts">
import { WRoll } from "@/packages/components/src/roll";

const title = "title";

const list = ["list1", "list2"];
const option = [{ prop: "", label: "" }];
</script>
