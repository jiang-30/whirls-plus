import { request, useApi } from '@/plugin/request'

// 查询所有可用的菜单
export function fetchQueryRoleMenuTree() {
  return request({
    method: 'get',
    url: `/admin/role/menu`,
  })
}

export function useRoleMenuTree() {
  useApi(fetchQueryRoleMenuTree)
}

// 查询当前角色授权的菜单
export function fetchQueryRoleMenus(roleId: string) {
  return request({
    method: 'get',
    url: `/admin/role/menu/${roleId}`,
  })
}

// 更新当前角色授权的菜单
export function fetchUpdateRoleMenus(params: any) {
  return request({
    method: 'put',
    url: '/admin/role/menu',
    data: params,
  })
}

export function fetchQueryRoleList() {
  return request({
    method: 'get',
    url: '/admin/role/list',
  })
}

export function fetchPage(params: { current: number; size: number }) {
  return request({
    method: 'get',
    url: '/admin/role/page',
    params: params,
  })
}

export function fetchCreate(params: any) {
  return request({
    method: 'post',
    url: '/admin/role',
    data: params,
  })
}

export function fetchUpdate(params: any) {
  return request({
    method: 'put',
    url: '/admin/role',
    data: params,
  })
}

export function fetchDelete(id: string) {
  return request({
    method: 'delete',
    url: `/admin/role/${id}`,
  })
}
