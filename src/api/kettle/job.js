import request from '@/utils/request'

// 查询作业管理列表
export function listJob(query) {
  return request({
    url: '/kettle/job/list',
    method: 'get',
    params: query
  })
}

// 查询作业管理详细
export function getJob(id) {
  return request({
    url: '/kettle/job/' + id,
    method: 'get'
  })
}

// 新增作业管理
export function addJob(data) {
  return request({
    url: '/kettle/job',
    method: 'post',
    data: data
  })
}

// 修改作业管理
export function updateJob(data) {
  return request({
    url: '/kettle/job',
    method: 'put',
    data: data
  })
}

// 删除作业管理
export function delJob(id) {
  return request({
    url: '/kettle/job/' + id,
    method: 'delete'
  })
}

// 导出作业管理
export function exportJob(query) {
  return request({
    url: '/kettle/job/export',
    method: 'get',
    params: query
  })
}

// 定时任务立即执行一次
export function runJob(id) {
  return request({
    url: '/kettle/job/run/' + id,
    method: 'get'
  })
}

// 任务状态修改
export function changeJobStatus(id, jobStatus) {
  const data = {
    id,
    jobStatus
  }
  return request({
    url: '/kettle/job/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询资源库信息
export function getRepositoryDict() {
  return request({
    url: '/kettle/job/repository',
    method: 'get'
  })
}

// 根据资源库id查询资源库中job作业内容树
export function findJobRepTree(id) {
  return request({
    url: '/kettle/job/tree/' + id,
    method: 'get'
  })
}
