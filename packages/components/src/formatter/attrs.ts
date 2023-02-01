// =======================================  dialog  =======================================
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
    "title",
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
    "beforeClose",
    "draggable",
    "center",
    "destroyOnClose",
]

// =======================================  dialog  =======================================