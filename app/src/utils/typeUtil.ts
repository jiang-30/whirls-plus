// 是否字符串
export const isString = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

// 是否数字
export const isNumber = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

// 是否boolean
export const isBoolean = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

// 是否函数
export const isFunction = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

// 是否为null
export const isNull = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

// 是否undefined
export const isUndefined = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

// 是否对象
export const isObj = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

// 是否数组
export const isArray = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

// 是否时间
export const isDate = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

// 是否正则
export const isRegExp = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

// 是否错误对象
export const isError = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

// 是否Symbol函数
export const isSymbol = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

// 是否Promise对象
export const isPromise = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

// 是否Set对象
export const isSet = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

// 是否为空
export const isEmpty = (o: any) => {}
