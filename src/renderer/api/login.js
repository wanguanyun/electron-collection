import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'post',
    // params: { token }
    data:{
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
