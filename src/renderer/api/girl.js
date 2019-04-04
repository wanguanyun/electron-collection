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

export function addGirl(params) {
  return request({
    url: '/girl/add',
    method: 'post',
    data: params
  })
}

export function modifyGirl(params) {
  return request({
    url: '/girl/update',
    method: 'post',
    data: params
  })
}
