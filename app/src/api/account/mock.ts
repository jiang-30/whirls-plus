/**
Basic	boolean, natural, integer, float, character, string, range, date, time, datetime, now
Image	image, dataImage
Color	color
Text	paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
Name	first, last, name, cfirst, clast, cname
Web	url, domain, email, ip, tld
Address	area, region
Helper	capitalize, upper, lower, pick, shuffle
Miscellaneous	guid, id
 */
import type { MockMethod } from 'vite-plugin-mock'

const apis: MockMethod[] = [
  // {
  //   url: '/api/auth/login',
  //   method: 'post',
  //   response: () => {
  //     return {
  //       code: 1,
  //       message: '成功',
  //       timestamp: '@now',
  //       data: {
  //         accessToken: '@guid',
  //         refreshToken: "@guid",
  //         tokenExpire: 18000
  //       },
  //     }
  //   },
  // },
  {
    url: '/api/auth/profile',
    method: 'get',
    response() {
      return {
        code: 1,
        message: '成功',
        timestamp: '@now',
        data: {
          userInfo: {
            username: '@name',
            avatar: "@image('20*20')",
            age: '@interge',
            description: "@cparagraph"
          }
          
        },
      }
    }
  },
  {
    url: '/api/auth/menu',
    method: 'get',
    response() {
      return {
        code: 1,
        message: '成功',
        timestamp: '@now',
        data: [],
      }
    }
  },
  {
    url: '/api/admin/dict/all',
    method: 'get',
    response() {
      return {
        code: 1,
        message: '成功',
        timestamp: '@now',
        data: [],
      }
    }
  },
  {
    url: '/api/admin/auth/profile',
    method: 'get',
    response() {
      return {
        code: 1,
        message: '成功',
        timestamp: '@now',
        'data|10': [{
          'id|+1': 1,
          name: "@cname",
          age: "@integer"
        }],
      }
    }
  },

]

export default apis;
