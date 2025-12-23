/**
 * 菜单相关类型定义
 */

// ============================================================
// 平台菜单配置类型（前端代码定义）
// ============================================================

/**
 * 平台菜单项（前端配置）
 * 定义在 src/config/menus.ts 中
 */
export interface PlatformMenuItem {
  menuCode: string      // 菜单唯一标识，用于与后端匹配
  menuName: string      // 菜单显示名称
  icon: string          // Material Icons 图标名
  path: string          // 路由路径
  sortOrder: number     // 排序
}

/**
 * 平台菜单分组（前端配置）
 */
export interface PlatformMenuGroup {
  groupCode: string              // 分组唯一标识
  groupTitle: string             // 分组标题
  sortOrder: number              // 排序
  children: PlatformMenuItem[]   // 子菜单项
}

// ============================================================
// 后端返回的菜单权限数据
// ============================================================

/**
 * 项目菜单配置（后端存储）
 * 只存储 menuCode，不存储菜单详情
 */
export interface ProjectMenuConfig {
  projectId: number
  menuCodes: string[]   // 项目可用的 menuCode 列表
}

/**
 * 角色菜单配置（后端存储）
 */
export interface RoleMenuConfig {
  roleId: number
  menuCodes: string[]   // 角色可用的 menuCode 列表（必须是项目菜单的子集）
}

// ============================================================
// 旧类型定义（保留兼容）
// ============================================================

// 菜单类型枚举
export type MenuType = 1 | 2 | 3  // 1-目录，2-菜单，3-按钮

// 菜单基础信息（数据库完整结构）
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

// 侧边栏菜单项（旧版，保留兼容）
export interface SidebarMenuItem {
  id: number
  menuCode: string
  menuName: string
  icon: string
  path: string
  isVisible: boolean
}

// 侧边栏菜单分组（旧版，保留兼容）
export interface SidebarMenuGroup {
  id: number
  groupTitle: string
  children: SidebarMenuItem[]
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
