import request from '@/utils/request'

export function getRecyleList(params) {
  return request({
    url: '/recyle/list',
    method: 'get',
  })
}


export function restoreGallery(params) {
    return request({
      url: '/recyle/gallery/restore',
      method: 'post',
      data: params
    })
  }