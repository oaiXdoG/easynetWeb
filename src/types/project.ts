/**
 * 项目相关类型定义
 */

// 项目基础信息
export interface Project {
  id: number
  projectCode: string
  projectName: string
  description: string | null
  logo: string | null
  status: number
  sortOrder: number
  createdBy: number | null
  createdAt: string
  updatedAt: string
}

// 项目列表项
export interface ProjectListItem {
  id: number
  projectCode: string
  projectName: string
  description: string | null
  logo: string | null
  status: number
  isDefault?: boolean
}

// 创建项目参数
export interface CreateProjectParams {
  projectCode: string
  projectName: string
  description?: string
  logo?: string
}

// 更新项目参数
export interface UpdateProjectParams {
  projectName?: string
  description?: string
  logo?: string
  status?: number
  sortOrder?: number
}

// 项目查询参数
export interface ProjectQueryParams {
  keyword?: string
  status?: number
  page?: number
  pageSize?: number
}

// 当前项目上下文
export interface CurrentProjectContext {
  id: number
  projectCode: string
  projectName: string
  roles: RoleItem[]
  permissions: string[]
  menus?: MenuItem[]
}

// 角色项（简化）
export interface RoleItem {
  id: number
  roleCode: string
  roleName: string
  isProjectAdmin: boolean
}

// 菜单项（简化）
export interface MenuItem {
  id: number
  menuCode: string
  menuName: string
  menuType: number
  icon: string | null
  path: string
  component?: string | null
  redirect?: string | null
  children?: MenuItem[]
}
