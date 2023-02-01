import { request } from "@/utils/request"

// 分页用户列表 - 单表查询
export function fetchQuerySimplePage(params: { current: number, size: number, [key: string]: any}){
  return request({
      method: 'get',
      url: '/admin/user/simple/page',
      params: params
  })
}

// 分页用户列表
export function fetchQueryPage(params: { current: number, size: number, [key: string]: any}){
    return request({
        method: 'get',
        url: '/admin/user/page',
        params: params
    })
}

// 新建用户
export function fetchCreate(params: any){
  return request({
      method: 'post',
      url: '/admin/user',
      data: params
  })
}

// 重置密码
export function fetchUpdatePassword(id: string){
  return request({
      method: 'put',
      url: `/admin/user/password/${id}`,
  })
}

// 修改用户状态
export function fetchUpdateEnabled(args: any){
  return request({
      method: 'put',
      url: `/admin/user/enabled`,
      data: args
  })
}

// 修改用户信息
export function fetchUpdate(params: any){
  return request({
      method: 'put',
      url: '/admin/user',
      data: params
  })
}

// 删除用户
export function fetchDelete(id: string){
  return request({
      method: 'delete',
      url: `/admin/user/${id}`,
  })
}


