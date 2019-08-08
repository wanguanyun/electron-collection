import request from '@/utils/request'

export function getDashboardTags() {
  return request({
    url: '/dashboard/hot/tag',
    method: 'get'
  })
}

export function getHotGalleryItem(params) {
  return request({
    url: '/dashboard/hot/gallery/item',
    method: 'post',
    data: params
  })
}

export function getHotGallery(params) {
  return request({
    url: '/dashboard/hot/gallery',
    method: 'post',
    data: params
  })
}

export function getHotCarouselItem() {
  return request({
    url: '/dashboard/hot/carousel/item',
    method: 'get'
  })
}
