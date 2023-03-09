import type { AxiosRequestConfig, AxiosInstance } from "axios";
import http from "./request";
import type { IResult } from "@/typings";
export { useApi } from "./useApi";

/**
 * 只返回 IResult.data
 * 异常是一个 Error对象, code属性是 IResult.code
 */
export const request = <T = any>(
  config: AxiosRequestConfig
): Promise<IResult<T>> => {
  return http(config);
};
