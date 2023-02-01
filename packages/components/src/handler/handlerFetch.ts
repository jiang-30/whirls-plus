// import 

/**
 * 请求表格数据
 */
export function fetchList(api: string, searchData: any) {

}

/**
 * 请求详情数据
 */
export function fetchDetail(api: string, id: string) {

}

/**
 * 请求新增数据
 */
export function fetchCreate(api: string, formData: any) {

}

/**
 * 请求更新数据
 */
export function fetchUpdate(api: string, formData: any) {

}

/**
 * 请求删除
 */
export function fetchDelete(row: Record<string, any>, index: number) {
  ElMessageBox.confirm('确定要执行删除操作吗', '提示', { type: 'warning' })
    .then(() => {})
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })
}
