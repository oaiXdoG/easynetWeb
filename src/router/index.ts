/**
 * 路由配置
 *
 * 路由自动从 config/menus.ts 生成，无需手动维护
 * 只有静态路由（登录、错误页面）需要在此文件定义
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'
import { getAllMenus, PATHS, PATH_HOME, PATH_NOT_FOUND } from '@/config/menus'
import type { PlatformMenuGroup } from '@/types'

// 动态导入组件的映射
const viewModules = import.meta.glob('@/views/**/*.vue')

/**
 * 根据组件路径获取动态导入函数
 */
function getViewComponent(componentPath: string) {
  const path = `/src/views/${componentPath}`
  if (viewModules[path]) {
    return viewModules[path]
  }
  console.warn(`Component not found: ${path}`)
  return () => import('@/views/Error/404.vue')
}

/**
 * 从菜单配置生成路由
 */
function generateRoutesFromMenus(menus: PlatformMenuGroup[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  for (const group of menus) {
    // 检查是否有嵌套路径（如 /log/app, /project/member）
    const hasNestedPaths = group.children.some(item => item.path.split('/').length > 2)

    if (hasNestedPaths) {
      // 嵌套路由：创建父路由
      const parentPath = group.children[0].path.split('/')[1] // 获取第一级路径
      const childRoutes: RouteRecordRaw[] = group.children.map(item => {
        const childPath = item.path.split('/').slice(2).join('/') // 获取子路径
        return {
          path: childPath,
          name: item.menuCode,
          component: getViewComponent(item.component),
          meta: { title: item.menuName, menuCode: item.menuCode }
        }
      })

      routes.push({
        path: parentPath,
        name: group.groupCode,
        meta: { title: group.groupTitle },
        children: childRoutes
      })
    } else {
      // 扁平路由：直接添加
      for (const item of group.children) {
        const path = item.path.startsWith('/') ? item.path.slice(1) : item.path
        routes.push({
          path,
          name: item.menuCode,
          component: getViewComponent(item.component),
          meta: { title: item.menuName, menuCode: item.menuCode }
        })
      }
    }
  }

  return routes
}

// 静态路由（无需登录）
const staticRoutes: RouteRecordRaw[] = [
  {
    path: PATHS.LOGIN,
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: PATHS.FORBIDDEN,
    name: 'Forbidden',
    component: () => import('@/views/Error/403.vue'),
    meta: { title: '无权限' }
  },
  {
    path: PATHS.NOT_FOUND,
    name: 'NotFound',
    component: () => import('@/views/Error/404.vue'),
    meta: { title: '页面不存在' }
  }
]

// 从菜单配置生成业务路由
const menuRoutes = generateRoutesFromMenus(getAllMenus())

// 需要认证的路由
const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: PATH_HOME,
    children: menuRoutes
  },
  // 捕获所有未匹配路由
  {
    path: '/:pathMatch(.*)*',
    redirect: PATH_NOT_FOUND
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...authRoutes]
})

// 设置路由守卫
setupRouterGuards(router)

export default router
