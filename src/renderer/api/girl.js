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

export function getAllGirlitems(params) {
  return request({
    url: '/girl/main/allitems',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getFavouriteGirlitems(params) {
  return request({
    url: '/girl/main/favourite/allitems',
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

export function setGirlitemFavourite(params) {
  return request({
    url: '/girl/favourite',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGirlItemViewers(params) {
  return request({
    url: '/girl/item/viewer',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGirlCombineLists(params) {
  return request({
    url: '/girl/gallery/combine/list',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function moveGirlItem(params) {
  return request({
    url: '/girl/move/item',
    method: 'post',
    data: {
      ...params
    }
  })
}
