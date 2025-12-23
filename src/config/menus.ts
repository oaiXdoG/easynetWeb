/**
 * 平台全量菜单配置
 *
 * 这是前端代码中定义的所有可用菜单
 * 后端只存储 menuCode，不存储菜单的具体信息（名称、图标、路径等）
 *
 * 权限层级：
 * 平台全量菜单 ⊇ 项目可用菜单 ⊇ 角色可用菜单 ⊇ 用户可见菜单
 */

import type { PlatformMenuGroup } from '@/types'

/**
 * 平台全量菜单定义
 * - 每个菜单项必须有唯一的 menuCode
 * - menuCode 用于与后端数据匹配
 * - 修改菜单只需修改此文件，无需同步后端
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
        path: '/dashboard',
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
        path: '/log/app',
        sortOrder: 1
      },
      {
        menuCode: 'log_server',
        menuName: '服务器日志',
        icon: 'dns',
        path: '/log/server',
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
        path: '/project/member',
        sortOrder: 1
      },
      {
        menuCode: 'project_role',
        menuName: '角色管理',
        icon: 'security',
        path: '/project/role',
        sortOrder: 2
      },
      {
        menuCode: 'project_permission',
        menuName: '权限配置',
        icon: 'lock',
        path: '/project/permission',
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
        path: '/system/user',
        sortOrder: 1
      },
      {
        menuCode: 'system_project',
        menuName: '项目管理',
        icon: 'folder',
        path: '/system/project',
        sortOrder: 2
      }
    ]
  }
]

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

  // 过滤普通菜单
  const filtered = platformMenus
    .filter(group => codeSet.has(group.groupCode))
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
