import { defineStore } from "pinia";
import { fetchDict } from "@/api/common";
import localDicts from "@/constant/dict/index";

const storeKey = "dict-store";

export const useDictStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
        storage: localStorage,
      },
    ],
  },
  state() {
    return {
      dictList: localDicts,
      isInit: false,
    };
  },
  getters: {
    findByKey() {
      return {};
    },
    items() {
      return (key: string) => {
        return this.dictList.find((item) => item.key == key)?.items ?? [];
      };
    },
    filter() {
      return (value: string, key: string) => {
        return (
          this.dictList
            .find((item) => item.key == key)
            ?.items.find((item) => item.value == value)?.label ?? value
        );
      };
    },
  },
  actions: {
    // 获取字典数据
    initHandler() {
      if (this.isInit === false) {
        this.isInit = true;
        return fetchDict().then((res) => {
          this.dictList = res;
        });
      }
    },
  },
});
