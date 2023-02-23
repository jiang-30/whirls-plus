import { request } from "@/plugin/request";

export function fetchQueryPage(params: { current: number; size: number }) {
  return request({
    method: "get",
    url: "/admin/log/login/page",
    params,
  });
}

export function fetchDelete(id: string) {
  return request({
    method: "delete",
    url: `/admin/log/login/${id}`,
  });
}
