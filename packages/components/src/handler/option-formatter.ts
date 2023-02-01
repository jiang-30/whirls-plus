/**
 * 通过type 为不同类型做不同的数据格式化
 * @param option
 */
export function formatter(option: any) {
  /**
   * 表格按钮
   */
  const tableButtons = ref([])

  /**
   * 表格属性
   */
  const tableAttrs = <any>computed(() => {
    return option.attrs ?? {}
  })

  /**
   * 表格事件
   */
  const tableEvents = <any>computed(() => {
    return (option as any).events ?? {}
  })

  /**
   * 操作按钮
   */
  const tableColumnButtons = ref<any[]>([])

  /**
   * 表格列
   */
  const tableColumnFields = ref<any[]>([])

  watch(
    () => {
      return option
    },
    val => {
      // const
      const columnButtons: any[] = []
      const columnFields: any[] = []

      val.buttons.forEach((button: any) => {
        if (button.scope === 'column') {
          columnButtons.push(button)
        }
      })

      val.fields.forEach((field: any) => {
        if (field.scope === 'column') {
        }
        columnFields.push(field)
      })

      tableColumnButtons.value = columnButtons
      tableColumnFields.value = columnFields
    },
    {
      immediate: true,
    },
  )
}
