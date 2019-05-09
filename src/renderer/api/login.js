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

export function changePw(param) {
  return request({
    url: '/users/changepw',
    method: 'post',
    data: {
      ...param
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'post',
    // params: { token }
    data: {
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
