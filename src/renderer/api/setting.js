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

export function getProjectInfo() {
  return request({
    url: '/setting/project/info',
    method: 'get'
  })
}

export function modifyAppModule(params) {
  return request({
    url: '/setting/modify/appmodule',
    method: 'post',
    data: params
  })
}

export function modifyDashboardNumber(params) {
  return request({
    url: '/setting/modify/dashboard/number',
    method: 'post',
    data: params
  })
}
