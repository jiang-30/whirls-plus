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
// const isInit = false;

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
    permissions: <string[]>["ROLE:ADMIN"], // setAuthorities ["ROLE:ADMIN"]
  }),
  getters: {
    isLogin: (state) => {
      return !!state.accessToken;
    },
  },
  actions: {
    isAuth(permissions: string[]) {
      if (permissions && permissions.length) {
        return !!permissions.find((permission) => {
          return !!this.permissions.find((item) => item == permission);
        });
      } else {
        return true;
      }
    },
    // 获取用户信息
    fetchUserInfo() {
      return fetchProfile().then(({ data }) => {
        // this.permissions = res.permissions
        this.userInfo = data.userInfo;
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
          return Promise.all([
            useDictStore().initHandler(),
            useMenuStore().initHandler(),
          ]);
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
      useDictStore().$reset();

      if (isClear) {
        useSettingStore().$reset();
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
