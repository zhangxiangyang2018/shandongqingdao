import request from '@/utils/request'

// 查询作业执行日志列表
export function listJobLog(query) {
  return request({
    url: '/kettle/jobLog/list',
    method: 'get',
    params: query
  })
}

// 查询作业执行日志详细
export function getJobLog(jobLogId) {
  return request({
    url: '/kettle/jobLog/' + jobLogId,
    method: 'get'
  })
}

// 新增作业执行日志
export function addJobLog(data) {
  return request({
    url: '/kettle/jobLog',
    method: 'post',
    data: data
  })
}

// 修改作业执行日志
export function updateJobLog(data) {
  return request({
    url: '/kettle/jobLog',
    method: 'put',
    data: data
  })
}

// 删除作业执行日志
export function delJobLog(jobLogId) {
  return request({
    url: '/kettle/jobLog/' + jobLogId,
    method: 'delete'
  })
}

// 清空作业执行日志
export function cleanJobLog() {
  return request({
    url: '/kettle/jobLog/clean',
    method: 'delete'
  })
}

// 导出作业执行日志
export function exportJobLog(query) {
  return request({
    url: '/kettle/jobLog/export',
    method: 'get',
    params: query
  })
}
