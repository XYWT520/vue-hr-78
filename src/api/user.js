import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料
export function getUserProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
