import { request } from "@/utils/request"

export function fetchQueryPage(params: {current: number, size: number}){
    return request({
        method: 'get',
        url: '/admin/file/page',
        params
    })
}

export function fetchDelete(id: string){
    return request({
        method: 'delete',
        url: `/admin/file/${id}`,
    })
}
