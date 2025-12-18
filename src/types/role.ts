/**
 * 角色相关类型定义
 */

// 角色基础信息
export interface Role {
  id: number
  projectId: number
  roleCode: string
  roleName: string
  description: string | null
  isProjectAdmin: boolean
  status: number
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// 角色列表项
export interface RoleListItem {
  id: number
  roleCode: string
  roleName: string
  description: string | null
  isProjectAdmin: boolean
  status: number
  permissionCount?: number
  userCount?: number
}

// 创建角色参数
export interface CreateRoleParams {
  roleCode: string
  roleName: string
  description?: string
  isProjectAdmin?: boolean
}

// 更新角色参数
export interface UpdateRoleParams {
  roleName?: string
  description?: string
  status?: number
  sortOrder?: number
}

// 角色权限分配参数
export interface AssignRolePermissionsParams {
  permissionIds: number[]
}
