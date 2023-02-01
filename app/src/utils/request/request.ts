import axios from "axios";
import { useUserStore } from "@/stores";
import { errorHandler } from "./error";

// 记录正在请求的实例
// const requestList = []

// 创建实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "X-Custom-Header": "foobar",
    "X-Client-Code": "",
    "X-Client-Secret": "",
    "X-Version": "",
  },
  validateStatus(status) {
    return status < 300 && status >= 200;
  },
  withCredentials: false,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 请求签名
    // const controller = new AbortController();
    // config.signal = controller.signal
    // controller.abort()

    // FormData 修改请求头
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // 添加请求token
    if (useUserStore().isLogin) {
      config.headers["Authorization"] = `Bearer ${useUserStore().accessToken}`;
    }

    return config;
  },

  //
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  function (response) {
    const { data } = response;

    if (data.code != 1) {
      // 用户未登录或者异常后退出
      if (data.code === 42001 || data.code == 42000) {
        useUserStore().logoutHandler();
      }

      const requestError = errorHandler(data.message, data.code);

      return Promise.reject(requestError);
    }

    return data.data;
  },
  // 请求异常
  function (error) {
    let message = "";
    const code = -1;
    let status = -1;

    if (axios.isCancel(error)) {
      message = `取消网络请求`;
    } else if (error.response) {
      status = error.response.status;
      message = error.response.data.message;
    } else if (error.request) {
      message = `request 请求异常`;
    } else {
      message = `网络异常`;
    }

    const requestError = errorHandler(message, code, status);

    return Promise.reject(requestError);
  }
);

export default instance;
