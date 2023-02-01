import { request } from "@/utils/request"


export function fetchPage(params: { current: number, size: number}){
    return request({
        method: 'get',
        url: '/admin/client/page',
        params: params
    })
}

export function fetchCreate(params: any){
  return request({
      method: 'post',
      url: '/admin/client',
      data: params
  })
}

export function fetchUpdate(params: any){
  return request({
      method: 'put',
      url: '/admin/client',
      data: params
  })
}

export function fetchDelete(id: string){
  return request({
      method: 'delete',
      url: `/admin/client/${id}`,
  })
}


