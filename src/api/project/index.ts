/**
 * 项目设置模块 API (项目管理员)
 * 对应页面: views/Project/
 */

import { request } from '../request'
import type {
  RoleListItem,
  CreateRoleParams,
  UpdateRoleParams,
  PermissionListItem,
  CreatePermissionParams,
  UpdatePermissionParams,
  CurrentProjectContext
} from '@/types'

// ==================== 项目上下文 ====================

// 获取用户可访问的项目列表
export function getUserProjects() {
  return request.get('/user/projects')
}

// 切换项目
export function switchProject(projectId: number) {
  return request.post<CurrentProjectContext>('/user/switch-project', { projectId })
}

// 获取当前项目权限
export function getCurrentProjectPermissions() {
  return request.get('/user/current-project/permissions')
}

// 获取当前项目菜单
export function getCurrentProjectMenus() {
  return request.get('/user/current-project/menus')
}

// ==================== 成员管理 ====================

// 获取项目成员列表
export function getMemberList(projectId: number) {
  return request.get(`/projects/${projectId}/members`)
}

// 添加成员
export function addMember(projectId: number, userId: number, roleIds: number[]) {
  return request.post(`/projects/${projectId}/members`, { userId, roleIds })
}

// 移除成员
export function removeMember(projectId: number, userId: number) {
  return request.delete(`/projects/${projectId}/members/${userId}`)
}

// 分配角色
export function assignMemberRoles(projectId: number, userId: number, roleIds: number[]) {
  return request.put(`/projects/${projectId}/members/${userId}/roles`, { roleIds })
}

// ==================== 角色管理 ====================

// 获取角色列表
export function getRoleList(projectId: number) {
  return request.get<RoleListItem[]>(`/projects/${projectId}/roles`)
}

// 创建角色
export function createRole(projectId: number, data: CreateRoleParams) {
  return request.post(`/projects/${projectId}/roles`, data)
}

// 更新角色
export function updateRole(projectId: number, roleId: number, data: UpdateRoleParams) {
  return request.put(`/projects/${projectId}/roles/${roleId}`, data)
}

// 删除角色
export function deleteRole(projectId: number, roleId: number) {
  return request.delete(`/projects/${projectId}/roles/${roleId}`)
}

// 分配权限给角色
export function assignRolePermissions(projectId: number, roleId: number, permissionIds: number[]) {
  return request.put(`/projects/${projectId}/roles/${roleId}/permissions`, { permissionIds })
}

// ==================== 权限管理 ====================

// 获取权限列表
export function getPermissionList(projectId: number) {
  return request.get<PermissionListItem[]>(`/projects/${projectId}/permissions`)
}

// 创建权限
export function createPermission(projectId: number, data: CreatePermissionParams) {
  return request.post(`/projects/${projectId}/permissions`, data)
}

// 更新权限
export function updatePermission(projectId: number, permId: number, data: UpdatePermissionParams) {
  return request.put(`/projects/${projectId}/permissions/${permId}`, data)
}

// 删除权限
export function deletePermission(projectId: number, permId: number) {
  return request.delete(`/projects/${projectId}/permissions/${permId}`)
}
