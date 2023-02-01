
interface IDialogAttrs {
  "title"?: string
  "width"?: string | number
  "fullscreen"?: boolean
  "top"?: string
  "modal"?: boolean
  "appendToBody"?: boolean
  "lockScroll"?: boolean
  "customClass"?: string
  "openDelay"?: number
  "closeDelay"?: number
  "closeOnClickModal"?: boolean
  "closeOnPressEscape"?: boolean
  "showClose"?: boolean
  "beforeClose"?: (done: () => {}) => void
  "draggable"?: boolean
  "center"?: boolean
  "destroyOnClose"?: boolean
}


const dialogAttrsKey: (keyof IDialogAttrs)[] = [
  // "title",
  "width",
  "fullscreen",
  "top",
  "modal",
  "appendToBody",
  "lockScroll",
  "customClass",
  "openDelay",
  "closeDelay",
  "closeOnClickModal",
  "closeOnPressEscape",
  "showClose",
  // "beforeClose",
  "draggable",
  "center",
  "destroyOnClose",
]

export function useDialogAttrsFormatter(type: string ,option: Record<string, any>, defaultConfig: Partial<IDialogAttrs> = {}): IDialogAttrs{
  const dialogConfig = {
    create: {
      title: '新增',
      closeOnClickModal: false,
    },
    update: {
      title: '编辑',
      closeOnClickModal: false,
    },
    info: {
      title: '详情',
      closeOnClickModal: true,
    },
  }
  const attrs: IDialogAttrs = {
    ...dialogConfig[type]
  }

  dialogAttrsKey.forEach(key => {
    if (key in option) {
      attrs[key] = option[key]
    }
  })

  return attrs
}
