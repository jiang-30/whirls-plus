import { defineStore } from "pinia";
import router from "@/router/index";
import { fetchProfile } from "@/api/account";
import type { IUserInfo } from "@/typings";
import {
  useMenuStore,
  useDictStore,
  useTabStore,
  useRouteStore,
  useSettingStore,
} from "@/stores";

const storeKey = "user-store";
let isInit = false;

export const useUserStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
      },
    ],
  },
  state: () => ({
    accessToken: "",
    refreshToken: "",
    expires: 0,
    userInfo: <IUserInfo>{},
    permissions: <string[]>[], // setAuthorities
  }),
  getters: {
    isLogin: (state) => {
      return !!state.accessToken;
    },
  },
  actions: {
    // 获取用户信息
    fetchUserInfo() {
      return fetchProfile().then((res) => {
        // this.permissions = res.permissions
        this.userInfo = res.userInfo;
      });
    },
    // 获取用户权限信息
    fetchUserPermission() {
      // return fetchProfile().then(res => {
      //   this.permissions = res.permissions
      //   this.userInfo = res.userInfo
      // })
    },
    // 校验用户登录态
    async fetchCheck() {
      return true;
    },

    // 初始化基础必要信息: 用户信息、菜单信息、字典信息
    async initHandler() {
      try {
        if (this.isLogin) {
          return Promise.all([useDictStore().initHandler()]);
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    /**
     * 退出系统
     */
    async logoutHandler(isClear = false) {
      this.$reset();
      useTabStore().$reset();
      useMenuStore().$reset();

      if (isClear) {
        useSettingStore().$reset();
        useDictStore().$reset();
      }

      const loginRoute = router
        .getRoutes()
        .find((row) => row.name == useRouteStore().loginPageName);

      if (loginRoute) {
        window.location.assign(router.resolve(loginRoute).href);
      }
    },
  },
});
