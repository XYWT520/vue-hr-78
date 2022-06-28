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

// 获取用户个人头像
/**
 * @description: 获取用户头像
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
