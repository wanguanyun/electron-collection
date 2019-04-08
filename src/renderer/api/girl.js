import request from '@/utils/request'

export function getGirlInfo(params) {
  return request({
    url: '/girl/info',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGirls(params) {
  return request({
    url: '/girl/main',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGirlitems(params) {
  return request({
    url: '/girl/main/items',
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

export function addGirlitem(params) {
  return request({
    url: '/girl/add/item',
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

export function modifyGirlitem(params) {
  return request({
    url: '/girl/update/item',
    method: 'post',
    data: params
  })
}

export function deleteGirl(params) {
  return request({
    url: '/girl/delete',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function deleteGirlitem(params) {
  return request({
    url: '/girl/delete/item',
    method: 'post',
    data: {
      ...params
    }
  })
}
