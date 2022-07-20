import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * @description: 删除部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 添加部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export function addDepartment(data) {
  return request({
    url: `/company/department`,
    method: 'post',
    data
  })
}

/**
 * @description: 获取部门详情
 * @param {*} id 表示当前要编辑项的id值
 * @return {*}
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
  * @description: 更新部门数据
  * @param {*} data:form表单数据 但是要有id值
  * @return {*}
  */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

export function get1(data) {
  return request({
    url: `http://127.0.0.1:8080/csf/hallCommon_IResAdminCSV_resReturn`,
    method: 'post',
    data
  })
}

