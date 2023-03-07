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
      return (code: string) => {
        return this.dictList.find((item) => item.code == code)?.items ?? [];
      };
    },
    filter() {
      return (value: string, code: string) => {
        return (
          this.dictList
            .find((item) => item.code == code)
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
        return fetchDict().then(({ data }) => {
          this.dictList = data;
        });
      }
    },
  },
});
