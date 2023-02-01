import { request } from "@/utils/request"

export function fetchTree(){
    return request({
        method: 'get',
        url: '/admin/menu/tree',
    })
}

export function fetchCreate(params: any){
  return request({
      method: 'post',
      url: '/admin/menu',
      data: params
  })
}

export function fetchUpdate(params: any){
  return request({
      method: 'put',
      url: '/admin/menu',
      data: params
  })
}

export function fetchDelete(id: string){
  return request({
      method: 'delete',
      url: `/admin/menu/${id}`,
  })
}


