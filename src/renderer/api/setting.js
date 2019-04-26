import request from '@/utils/request'

export function modifyAvatar(params) {
    return request({
      url: '/setting/modify/avatar',
      method: 'post',
      data: params
    })
  }