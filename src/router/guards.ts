/**
 * 路由守卫
 */

import type { Router } from 'vue-router'
import { useAuthStore, useProjectStore, useMenuStore } from '@/stores'
import { platformMenus, superAdminMenus, PATH_HOME, PATH_LOGIN, PATH_FORBIDDEN, PATH_NOT_FOUND } from '@/config/menus'

// 白名单路由（无需登录）
const whiteList = [PATH_LOGIN, PATH_NOT_FOUND, PATH_FORBIDDEN]

// 分组路径映射（用于动态 redirect）
// 只有嵌套路由才需要（如 /project, /log），扁平路由不需要（如 /dashboard）
const groupPaths = new Map<string, string>()
for (const group of [...platformMenus, ...superAdminMenus]) {
  if (group.children.length > 0) {
    // 检查是否是嵌套路径（如 /log/app 有 3 段）
    const firstChildPath = group.children[0].path
    const segments = firstChildPath.split('/').filter(Boolean)
    if (segments.length >= 2) {
      // 嵌套路由，提取父路径
      const parentPath = '/' + segments[0]
      groupPaths.set(parentPath, group.groupCode)
    }
  }
}

export function setupRouterGuards(router: Router) {
  // 前置守卫
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()
    const projectStore = useProjectStore()
    const menuStore = useMenuStore()

    // 固定站点标题（不随路由变化）
    document.title = 'EasyNet 管理平台'

    // 白名单路由直接放行
    if (whiteList.includes(to.path)) {
      // 已登录访问登录页，跳转到首页
      if (to.path === PATH_LOGIN && authStore.isLoggedIn) {
        next(PATH_HOME)
        return
      }
      next()
      return
    }

    // 检查登录状态
    if (!authStore.checkAuth()) {
      next({ path: PATH_LOGIN, query: { redirect: to.fullPath } })
      return
    }

    // 检查是否已加载项目上下文
    if (!projectStore.currentProject && authStore.userProjects.length > 0) {
      try {
        await projectStore.initDefaultProject(authStore.userProjects)
        await menuStore.loadMenus()
      } catch (error) {
        console.error('初始化项目失败:', error)
        authStore.clearLoginData()
        next({ path: PATH_LOGIN, query: { redirect: to.fullPath } })
        return
      }
    }

    // 处理分组路径的动态 redirect
    // 例如：访问 /project 时，跳转到用户有权限的第一个子菜单
    if (groupPaths.has(to.path)) {
      const groupCode = groupPaths.get(to.path)!
      const allMenus = [...platformMenus, ...superAdminMenus]
      const group = allMenus.find(g => g.groupCode === groupCode)

      if (group) {
        // 找到用户有权限的第一个子菜单
        const visibleCodes = menuStore.visibleMenuCodes
        const isSuperAdmin = authStore.isSuperAdmin

        for (const item of group.children) {
          if (isSuperAdmin || visibleCodes.includes(item.menuCode)) {
            next(item.path)
            return
          }
        }

        // 没有任何子菜单权限，跳转到 403
        next(PATH_FORBIDDEN)
        return
      }
    }

    // 检查菜单权限
    const menuCode = to.meta.menuCode as string | undefined
    if (menuCode && !authStore.isSuperAdmin) {
      if (!menuStore.isMenuVisible(menuCode)) {
        next(PATH_FORBIDDEN)
        return
      }
    }

    // 检查路由权限
    if (to.meta.permissions) {
      const permissions = to.meta.permissions as string[]
      const hasPermission = authStore.isSuperAdmin ||
        permissions.some(p => projectStore.currentProject?.permissions.includes(p))

      if (!hasPermission) {
        next(PATH_FORBIDDEN)
        return
      }
    }

    next()
  })

  // 后置守卫
  router.afterEach((_to, _from) => {
    // 可以在这里添加页面访问日志等
  })
}
