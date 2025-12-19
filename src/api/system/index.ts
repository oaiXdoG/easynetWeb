/**
 * 系统管理模块 API (超管专用)
 * 对应页面: views/System/
 */

import { request } from '../request'
import type {
  PageResult,
  UserListItem,
  CreateUserParams,
  UpdateUserParams,
  UserQueryParams,
  Project,
  CreateProjectParams,
  UpdateProjectParams,
  ProjectQueryParams
} from '@/types'

// ==================== 账号管理 ====================

// 获取账号列表
export function getUserList(params?: UserQueryParams) {
  return request.get<PageResult<UserListItem>>('/system/users', { params })
}

// 创建账号
export function createUser(data: CreateUserParams) {
  return request.post('/system/users', data)
}

// 更新账号
export function updateUser(id: number, data: UpdateUserParams) {
  return request.put(`/system/users/${id}`, data)
}

// 删除账号
export function deleteUser(id: number) {
  return request.delete(`/system/users/${id}`)
}

// 启用/禁用账号
export function updateUserStatus(id: number, status: number) {
  return request.patch(`/system/users/${id}/status`, { status })
}

// 重置密码
export function resetUserPassword(id: number) {
  return request.post(`/system/users/${id}/reset-password`)
}

// ==================== 项目管理 ====================

// 获取项目列表
export function getProjectList(params?: ProjectQueryParams) {
  return request.get<PageResult<Project>>('/system/projects', { params })
}

// 创建项目
export function createProject(data: CreateProjectParams) {
  return request.post('/system/projects', data)
}

// 更新项目
export function updateProject(id: number, data: UpdateProjectParams) {
  return request.put(`/system/projects/${id}`, data)
}

// 删除项目
export function deleteProject(id: number) {
  return request.delete(`/system/projects/${id}`)
}

// 启用/禁用项目
export function updateProjectStatus(id: number, status: number) {
  return request.patch(`/system/projects/${id}/status`, { status })
}
