import request from '@/utils/request'
export function getGirls(params) {
  return request({
    url: '/girl/main',
    method: 'post',
    data: {
      ...params
    }
  })
}
