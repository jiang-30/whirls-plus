import { request } from "@/utils/request"

export function fetchQueryPage(params: {current: number, size: number}){
    return request({
        method: 'get',
        url: '/admin/log/operation/page',
        params
    })
}

export function fetchDelete(id: string){
    return request({
        method: 'delete',
        url: `/admin/log/operation/${id}`,
    })
}
