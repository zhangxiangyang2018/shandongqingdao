import request from '@/utils/request'

// 查询转换管理列表
export function listTrans(query) {
  return request({
    url: '/kettle/trans/list',
    method: 'get',
    params: query
  })
}

// 查询转换管理详细
export function getTrans(id) {
  return request({
    url: '/kettle/trans/' + id,
    method: 'get'
  })
}

// 新增转换管理
export function addTrans(data) {
  return request({
    url: '/kettle/trans',
    method: 'post',
    data: data
  })
}

// 修改转换管理
export function updateTrans(data) {
  return request({
    url: '/kettle/trans',
    method: 'put',
    data: data
  })
}

// 删除转换管理
export function delTrans(id) {
  return request({
    url: '/kettle/trans/' + id,
    method: 'delete'
  })
}

// 导出转换管理
export function exportTrans(query) {
  return request({
    url: '/kettle/trans/export',
    method: 'get',
    params: query
  })
}

// 定时任务立即执行一次
export function runJob(id) {
  return request({
    url: '/kettle/trans/run/' + id,
    method: 'get'
  })
}

// 任务状态修改
export function changeJobStatus(id, transStatus) {
  const data = {
    id,
    transStatus
  }
  return request({
    url: '/kettle/trans/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询资源库信息
export function getRepositoryDict() {
  return request({
    url: '/kettle/trans/repository',
    method: 'get'
  })
}

// 根据资源库id查询资源库中trans转换内容树
export function findTransRepTree(id) {
  return request({
    url: '/kettle/trans/tree/' + id,
    method: 'get'
  })
}
