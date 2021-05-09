import request from '@/utils/request'

// 查询转换执行日志列表
export function listTransLog(query) {
  return request({
    url: '/kettle/transLog/list',
    method: 'get',
    params: query
  })
}

// 查询转换执行日志详细
export function getTransLog(transLogId) {
  return request({
    url: '/kettle/transLog/' + transLogId,
    method: 'get'
  })
}

// 新增转换执行日志
export function addTransLog(data) {
  return request({
    url: '/kettle/transLog',
    method: 'post',
    data: data
  })
}

// 修改转换执行日志
export function updateTransLog(data) {
  return request({
    url: '/kettle/transLog',
    method: 'put',
    data: data
  })
}

// 删除转换执行日志
export function delTransLog(transLogId) {
  return request({
    url: '/kettle/transLog/' + transLogId,
    method: 'delete'
  })
}

// 清空转换执行日志
export function cleanTransLog() {
  return request({
    url: '/kettle/transLog/clean',
    method: 'delete'
  })
}

// 导出转换执行日志
export function exportTransLog(query) {
  return request({
    url: '/kettle/transLog/export',
    method: 'get',
    params: query
  })
}
