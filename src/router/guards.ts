/**
 * 路由守卫
 */

import type { Router } from 'vue-router'
import { useAuthStore, useProjectStore, useMenuStore } from '@/stores'

// 白名单路由（无需登录）
const whiteList = ['/login', '/404', '/403']

export function setupRouterGuards(router: Router) {
  // 前置守卫
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const projectStore = useProjectStore()
    const menuStore = useMenuStore()

    // 设置页面标题
    document.title = to.meta.title
      ? `${to.meta.title} - EasyNet`
      : 'EasyNet 管理平台'

    // 白名单路由直接放行
    if (whiteList.includes(to.path)) {
      // 已登录访问登录页，跳转到首页
      if (to.path === '/login' && authStore.isLoggedIn) {
        next('/dashboard')
        return
      }
      next()
      return
    }

    // 检查登录状态
    if (!authStore.checkAuth()) {
      next({ path: '/login', query: { redirect: to.fullPath } })
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
        next({ path: '/login', query: { redirect: to.fullPath } })
        return
      }
    }

    // 检查路由权限
    if (to.meta.permissions) {
      const permissions = to.meta.permissions as string[]
      const hasPermission = authStore.isSuperAdmin ||
        permissions.some(p => projectStore.currentProject?.permissions.includes(p))

      if (!hasPermission) {
        next('/403')
        return
      }
    }

    next()
  })

  // 后置守卫
  router.afterEach((to, from) => {
    // 可以在这里添加页面访问日志等
  })
}
