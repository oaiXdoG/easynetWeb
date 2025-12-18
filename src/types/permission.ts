/**
 * 权限相关类型定义
 */

// 权限类型枚举
export type PermissionType = 'menu' | 'action' | 'data'

// 权限基础信息
export interface Permission {
  id: number
  projectId: number
  permissionCode: string
  permissionName: string
  description: string | null
  permissionType: PermissionType
  parentId: number
  sortOrder: number
  status: number
  createdAt: string
  updatedAt: string
}

// 权限列表项
export interface PermissionListItem {
  id: number
  permissionCode: string
  permissionName: string
  description: string | null
  permissionType: PermissionType
  parentId: number
  children?: PermissionListItem[]
}

// 创建权限参数
export interface CreatePermissionParams {
  permissionCode: string
  permissionName: string
  description?: string
  permissionType?: PermissionType
  parentId?: number
}

// 更新权限参数
export interface UpdatePermissionParams {
  permissionName?: string
  description?: string
  permissionType?: PermissionType
  status?: number
  sortOrder?: number
}

// 用户权限信息
export interface UserPermission {
  code: string
  name: string
}
