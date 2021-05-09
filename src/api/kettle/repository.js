import request from '@/utils/request'

// 查询资源库列表
export function listRepository(query) {
  return request({
    url: '/kettle/repository/list',
    method: 'get',
    params: query
  })
}

// 查询资源库详细
export function getRepository(id) {
  return request({
    url: '/kettle/repository/' + id,
    method: 'get'
  })
}

// 新增资源库
export function addRepository(data) {
  return request({
    url: '/kettle/repository',
    method: 'post',
    data: data
  })
}

// 修改资源库
export function updateRepository(data) {
  return request({
    url: '/kettle/repository',
    method: 'put',
    data: data
  })
}

// 删除资源库
export function delRepository(id) {
  return request({
    url: '/kettle/repository/' + id,
    method: 'delete'
  })
}

// 导出资源库
export function exportRepository(query) {
  return request({
    url: '/kettle/repository/export',
    method: 'get',
    params: query
  })
}


// 测试资源库链接
export function testConnection(data) {
  return request({
    url: '/kettle/repository/connection',
    method: 'put',
    data: data
  })
}
