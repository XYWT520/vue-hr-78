import request from '@/utils/request'

/**
 * @description: 获取下拉员工数据
 * @param {*}
 * @return {*}
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
