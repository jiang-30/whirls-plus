import { request } from "@/utils/request"

export function fetchTree(){
    return request({
        method: 'get',
        url: '/admin/dept/tree',
    })
}

export function fetchCreate(params: any){
  return request({
      method: 'post',
      url: '/admin/dept',
      data: params
  })
}

export function fetchUpdate(params: any){
  return request({
      method: 'put',
      url: '/admin/dept',
      data: params
  })
}

export function fetchDelete(deptId: string){
  return request({
      method: 'delete',
      url: `/admin/dept/${deptId}`,
  })
}
