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
  menuCodes?: string[]  // 项目可用的菜单 Code 列表
}

// 更新项目参数
export interface UpdateProjectParams {
  projectName?: string
  description?: string
  logo?: string
  status?: number
  sortOrder?: number
  menuCodes?: string[]  // 更新项目菜单
}

// 项目查询参数
export interface ProjectQueryParams {
  keyword?: string
  status?: number
  page?: number
  pageSize?: number
}

/**
 * 当前项目上下文
 *
 * 后端返回的数据结构：
 * - visibleMenuCodes: 用户在当前项目下可见的菜单 Code 列表
 * - 前端根据 visibleMenuCodes 从 platformMenus 中过滤出实际显示的菜单
 */
export interface CurrentProjectContext {
  id: number
  projectCode: string
  projectName: string
  roles: RoleItem[]
  permissions: string[]
  visibleMenuCodes: string[]  // 用户可见的菜单 Code 列表（角色菜单的并集）
}

// 角色项（简化）
export interface RoleItem {
  id: number
  roleCode: string
  roleName: string
  isProjectAdmin: boolean
}

// 菜单项（简化）- 保留用于其他场景
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
