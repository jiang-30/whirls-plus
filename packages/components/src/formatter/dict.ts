import { useDictStore } from '@/stores'

export function useDictFormatter(option: any) {
  // console.log(option)
  option.fields.forEach((field: any) => {
    if(field.dictUrl && !field.dictData) {
      setTimeout(() => {
        field.dictData = [
          { label: 'test1', value: '1'},
          { label: 'test2', value: '2'},
          { label: 'test3', value: '3'},
          { label: 'test4', value: '4'},
        ]
      }, 2000)
      // fetch 后赋值到dictData; field.props.res 定义响应结构
    }
  })
}

// export 

export function handlerDict(item: Record<string, any>){
  const dictTypekeys = ['radio', 'radioButton', 'select']
  if(dictTypekeys.includes(item.type)) {
    if(item.dictData) {
      return item.dictData
    } else if(item.dictKey) {
      const dictList = useDictStore().dictList
      const dict = dictList.find(dict => dict.code === item.dictKey)
      if(dict) {
        return dict.items
      }
    }
  }
}