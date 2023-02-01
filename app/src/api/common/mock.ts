import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/common/test',
    method: 'get',
    response: (req: any) => {
      return {
        code: 1,
        message: '成功',
        timestamp: '@now',
        'data|20': [
          {
            id: '@id',
            username: '@ctitle',
            description: '@cparagraph',
            query: req.query,
            body: req.body
          }
        ],
      }
    },
  }
] as MockMethod[]
