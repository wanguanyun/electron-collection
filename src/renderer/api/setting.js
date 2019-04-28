import request from '@/utils/request'

export function modifyAvatar(params) {
  return request({
    url: '/setting/modify/avatar',
    method: 'post',
    data: params
  })
}

export function modifyCover(params) {
  return request({
    url: '/setting/modify/cover',
    method: 'post',
    data: params
  })
}

export function modifyItemCover(params) {
  return request({
    url: '/setting/modify/cover/item',
    method: 'post',
    data: params
  })
}
