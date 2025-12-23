/**
 * 平台全量菜单配置
 *
 * 这是前端代码中定义的所有可用菜单，也是路由的唯一数据源
 * 后端只存储 menuCode，不存储菜单的具体信息（名称、图标、路径等）
 *
 * 权限层级：
 * 平台全量菜单 ⊇ 项目可用菜单 ⊇ 角色可用菜单 ⊇ 用户可见菜单
 *
 * 添加新模块只需：
 * 1. 在此文件添加菜单配置
 * 2. 创建对应的页面组件
 * 3. 更新 mock 数据中的 menuCodes
 */

import type { PlatformMenuGroup } from '@/types'

// ============================================================
// 路径常量（全局统一使用，避免硬编码）
// ============================================================

/** 所有路径常量 */
export const PATHS = {
  // 静态路由（无需登录）
  LOGIN: '/login',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',

  // 控制台
  CONSOLE: {
    DASHBOARD: '/console/dashboard'
  },

  // 日志
  LOG: {
    APP: '/log/app',
    SERVER: '/log/server'
  },

  // 项目设置
  PROJECT: {
    MEMBER: '/project/member',
    ROLE: '/project/role',
    PERMISSION: '/project/permission'
  },

  // 系统管理（超管专属）
  SYSTEM: {
    USER: '/system/user',
    PROJECT: '/system/project'
  }
} as const

/** 默认首页路径 */
export const PATH_HOME = PATHS.CONSOLE.DASHBOARD

/** 登录页路径 */
export const PATH_LOGIN = PATHS.LOGIN

/** 403 无权限页路径 */
export const PATH_FORBIDDEN = PATHS.FORBIDDEN

/** 404 页面不存在路径 */
export const PATH_NOT_FOUND = PATHS.NOT_FOUND

// ============================================================
// 菜单配置
// ============================================================

/**
 * 平台全量菜单定义
 * - 每个菜单项必须有唯一的 menuCode
 * - menuCode 用于与后端数据匹配
 * - path 和 component 定义路由信息
 * - 路由会自动从此配置生成，无需手动维护 router/index.ts
 */
export const platformMenus: PlatformMenuGroup[] = [
  {
    groupCode: 'console',
    groupTitle: '控制台',
    sortOrder: 1,
    children: [
      {
        menuCode: 'dashboard',
        menuName: '数据看板',
        icon: 'dashboard',
        path: PATHS.CONSOLE.DASHBOARD,
        component: 'Dashboard/Index.vue',
        sortOrder: 1
      }
    ]
  },
  {
    groupCode: 'log',
    groupTitle: '日志',
    sortOrder: 2,
    children: [
      {
        menuCode: 'log_app',
        menuName: '应用日志',
        icon: 'receipt_long',
        path: PATHS.LOG.APP,
        component: 'Log/Game.vue',
        sortOrder: 1
      },
      {
        menuCode: 'log_server',
        menuName: '服务器日志',
        icon: 'dns',
        path: PATHS.LOG.SERVER,
        component: 'Log/Server.vue',
        sortOrder: 2
      }
    ]
  },
  {
    groupCode: 'project_settings',
    groupTitle: '项目设置',
    sortOrder: 3,
    children: [
      {
        menuCode: 'project_member',
        menuName: '成员管理',
        icon: 'people',
        path: PATHS.PROJECT.MEMBER,
        component: 'Project/Member.vue',
        sortOrder: 1
      },
      {
        menuCode: 'project_role',
        menuName: '角色管理',
        icon: 'security',
        path: PATHS.PROJECT.ROLE,
        component: 'Project/Role.vue',
        sortOrder: 2
      },
      {
        menuCode: 'project_permission',
        menuName: '权限配置',
        icon: 'lock',
        path: PATHS.PROJECT.PERMISSION,
        component: 'Project/Permission.vue',
        sortOrder: 3
      }
    ]
  }
]

/**
 * 超级管理员专属菜单
 * 这些菜单不属于任何项目，只有超级管理员可见
 */
export const superAdminMenus: PlatformMenuGroup[] = [
  {
    groupCode: 'system',
    groupTitle: '系统管理',
    sortOrder: 100,
    children: [
      {
        menuCode: 'system_user',
        menuName: '账号管理',
        icon: 'person',
        path: PATHS.SYSTEM.USER,
        component: 'System/User.vue',
        sortOrder: 1
      },
      {
        menuCode: 'system_project',
        menuName: '项目管理',
        icon: 'folder',
        path: PATHS.SYSTEM.PROJECT,
        component: 'System/Project.vue',
        sortOrder: 2
      }
    ]
  }
]

/**
 * 获取所有菜单配置（包含超管菜单）
 * 用于生成路由
 */
export function getAllMenus(): PlatformMenuGroup[] {
  return [...platformMenus, ...superAdminMenus]
}

/**
 * 获取所有菜单 Code 列表（用于创建项目时的菜单选择）
 */
export function getAllMenuCodes(): string[] {
  const codes: string[] = []
  for (const group of platformMenus) {
    codes.push(group.groupCode)
    for (const item of group.children) {
      codes.push(item.menuCode)
    }
  }
  return codes
}

function collectMenuCodes(menus: PlatformMenuGroup[], output: Set<string>) {
  for (const group of menus) {
    output.add(group.groupCode)
    for (const item of group.children) {
      output.add(item.menuCode)
    }
  }
}

function warnUnknownMenuCodes(visibleCodes: string[], includeSuperAdmin: boolean) {
  if (visibleCodes.length === 0) return

  const knownCodes = new Set<string>()
  collectMenuCodes(platformMenus, knownCodes)
  if (includeSuperAdmin) collectMenuCodes(superAdminMenus, knownCodes)

  const unknownCodes = visibleCodes.filter(code => !knownCodes.has(code))
  if (unknownCodes.length > 0) {
    console.warn(
      `[menus] Unknown menu codes from backend (${unknownCodes.length}): ${unknownCodes.join(', ')}`
    )
  }
}

/**
 * 根据 menuCode 列表过滤菜单
 * @param visibleCodes 可见的 menuCode 列表（从后端获取）
 * @param includeSuperAdmin 是否包含超管菜单
 */
export function filterMenusByCode(
  visibleCodes: string[],
  includeSuperAdmin: boolean = false
): PlatformMenuGroup[] {
  const codeSet = new Set(visibleCodes)
  warnUnknownMenuCodes(visibleCodes, includeSuperAdmin)

  const filtered = platformMenus
    .map(group => ({
      ...group,
      children: group.children.filter(item => codeSet.has(item.menuCode))
    }))
    .filter(group => group.children.length > 0)

  // 超管菜单直接追加（不需要过滤）
  if (includeSuperAdmin) {
    return [...filtered, ...superAdminMenus]
  }

  return filtered
}

/**
 * 获取菜单树形结构（用于创建项目/角色时的菜单选择 UI）
 */
export function getMenuTree(): Array<{
  code: string
  name: string
  children: Array<{ code: string; name: string }>
}> {
  return platformMenus.map(group => ({
    code: group.groupCode,
    name: group.groupTitle,
    children: group.children.map(item => ({
      code: item.menuCode,
      name: item.menuName
    }))
  }))
}
