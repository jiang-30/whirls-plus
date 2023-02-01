
export interface IQuestion {
  id?: number
  type: string
  title: string
  options: string[]
  answer: number | number[] | string
  analysis: string
}


export class Question implements IQuestion {
  type = '1'
  title = ''
  options = ['', '', '', '']
  answer = 0
  analysis = ''
}

// export 
