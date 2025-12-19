/**
 * 菜单相关类型定义
 */

// 菜单类型枚举
export type MenuType = 1 | 2 | 3  // 1-目录，2-菜单，3-按钮

// 菜单基础信息
export interface Menu {
  id: number
  projectId: number
  parentId: number
  menuCode: string
  menuName: string
  menuType: MenuType
  icon: string | null
  path: string | null
  component: string | null
  redirect: string | null
  isVisible: boolean
  isCache: boolean
  isExternal: boolean
  sortOrder: number
  status: number
  createdAt: string
  updatedAt: string
}

// 菜单树节点
export interface MenuTreeNode {
  id: number
  menuCode: string
  menuName: string
  menuType: MenuType
  parentId?: number
  icon?: string | null
  path?: string | null
  component?: string | null
  redirect?: string | null
  isVisible?: boolean
  isCache?: boolean
  isExternal?: boolean
  sortOrder?: number
  children?: MenuTreeNode[]
}

// 创建菜单参数
export interface CreateMenuParams {
  parentId?: number
  menuCode: string
  menuName: string
  menuType: MenuType
  icon?: string
  path?: string
  component?: string
  redirect?: string
  isVisible?: boolean
  isCache?: boolean
  isExternal?: boolean
  sortOrder?: number
}

// 更新菜单参数
export interface UpdateMenuParams {
  menuName?: string
  icon?: string
  path?: string
  component?: string
  redirect?: string
  isVisible?: boolean
  isCache?: boolean
  isExternal?: boolean
  sortOrder?: number
  status?: number
}

// 路由元信息
export interface RouteMeta {
  title: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  permissions?: string[]
}
