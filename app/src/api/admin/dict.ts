import { request } from "@/plugin/request";

export function fetchPage(params: { current: number; size: number }) {
  return request({
    method: "get",
    url: "/admin/dict/page",
    params,
  });
}

export function fetchCreate(params: any) {
  return request({
    method: "post",
    url: "/admin/dict",
    data: params,
  });
}

export function fetchUpdate(params: any) {
  return request({
    method: "put",
    url: "/admin/dict",
    data: params,
  });
}

export function fetchDelete(id: string) {
  return request({
    method: "delete",
    url: `/admin/dict/${id}`,
  });
}

export function fetchDictItemAll(id: string) {
  return request({
    method: "get",
    url: `/admin/dict/details/all`,
  });
}

export function fetchItemList(dictId: string) {
  return request({
    method: "get",
    url: `/admin/dict-item/list/${dictId}`,
  });
}

export function fetchItemCreate(params: any) {
  return request({
    method: "post",
    url: "/admin/dict-item",
    data: params,
  });
}

export function fetchItemUpdate(params: any) {
  return request({
    method: "put",
    url: "/admin/dict-item",
    data: params,
  });
}

export function fetchItemDelete(dictItemId: string) {
  return request({
    method: "delete",
    url: `/admin/dict-item/${dictItemId}`,
  });
}
