import { request } from "@/plugin/request";
import type { ILoginParam, ILoginResponse } from "./types";

// 用户登录
export const fetchLogin = (param: ILoginParam) => {
  return request<ILoginResponse>({
    method: "post",
    url: "/admin/auth/login/username",
    data: param,
  });
};

// 查询用户信息
export const fetchProfile = () => {
  return request({
    method: "get",
    url: "/admin/auth/profile",
  });
};

// 动态菜单
export function fetchPermission() {
  return request({
    method: "get",
    url: "/admin/auth/permission",
  });
}

// 修改信息
export function fetchUpdateInfo(args: {
  nickname: string;
  avatar: string;
  description: string;
}) {
  return request({
    method: "put",
    url: "/admin/auth/info",
    data: args,
  });
}

// 修改密码
export function fetchUpdatePassword(args: {
  oldPassword: string;
  password: string;
}) {
  return request({
    method: "put",
    url: "/admin/auth/password",
    data: args,
  });
}
