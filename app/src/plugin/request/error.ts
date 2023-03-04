import { ElMessage } from "element-plus";
import { useOnline } from "@vueuse/core";

const codeMessage: Record<number, string> = {
  "10031": "登录失效，需要重新登录",
  "10032": "您太久没登录，请重新登录~",
  "10033": "账户未绑定角色，请联系管理员绑定角色",
  "10034": "该用户未注册，请联系管理员注册用户",
  "10035": "code 无法获取对应第三方平台用户",
  "10036": "该账户未关联员工，请联系管理员做关联",
  "10037": "账号已无效",
  "10038": "账号未找到",
};

const statusMessage: Record<number, string> = {
  "401": "未授权, 请重新登录",
  "403": "拒绝访问",
  "404": "请求错误, 未找到资源",
  "405": "请求方法未允许",
  "408": "请求超时",
  "500": "服务端出错",
  "501": "网络未实现",
  "502": "网络错误",
  "503": "服务不可用",
  "504": "网络超时",
  "505": "http 版本不支持该请求",
};

export class RequestError extends Error {
  public code: number;
  public status: number;

  constructor(status: number, code: number, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// 构建自定义异常对象, 并可以根据 code 和 status做不同的处理
export const errorHandler = (status: number, code: number, message: string) => {
  if (!useOnline().value) {
    message = "网络异常，请检查当前网络";
  } else {
    message =
      message ?? statusMessage[status] ?? codeMessage[code] ?? "请求异常";
  }

  ElMessage.closeAll();
  ElMessage({
    message: message,
    type: "warning",
  });

  return new RequestError(status, code, message);
};
