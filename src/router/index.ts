/**
 * 路由配置
 *
 * 路由与页面对应关系：
 * /login          → views/Auth/Login.vue
 * /dashboard      → views/Dashboard/Index.vue
 * /system/*       → views/System/*.vue        (API: api/system)
 * /project/*      → views/Project/*.vue       (API: api/project)
 * /403, /404      → views/Error/*.vue
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

// 静态路由（无需登录）
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/Error/403.vue'),
    meta: { title: '无权限' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/Error/404.vue'),
    meta: { title: '页面不存在' }
  }
]

// 需要认证的路由
const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/dashboard',
    children: [
      // 控制台
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/Index.vue'),
        meta: { title: '控制台' }
      },

      // 日志中心
      {
        path: 'log',
        name: 'Log',
        redirect: '/log/game',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: { title: '日志' },
        children: [
          {
            path: 'game',
            name: 'LogGame',
            component: () => import('@/views/Log/Game.vue'),
            meta: { title: '游戏日志' }
          },
          {
            path: 'server',
            name: 'LogServer',
            component: () => import('@/views/Log/Server.vue'),
            meta: { title: '服务器信息日志' }
          }
        ]
      },
      // 系统管理 (超管) - 对应 api/system
      {
        path: 'system',
        name: 'System',
        redirect: '/system/user',
        meta: { title: '系统管理' },
        children: [
          {
            path: 'user',
            name: 'SystemUser',
            component: () => import('@/views/System/User.vue'),
            meta: { title: '账号管理' }
          },
          {
            path: 'project',
            name: 'SystemProject',
            component: () => import('@/views/System/Project.vue'),
            meta: { title: '项目管理' }
          }
        ]
      },

      // 项目设置 - 对应 api/project
      {
        path: 'project',
        name: 'Project',
        redirect: '/project/member',
        meta: { title: '项目设置' },
        children: [
          {
            path: 'member',
            name: 'ProjectMember',
            component: () => import('@/views/Project/Member.vue'),
            meta: { title: '成员管理' }
          },
          {
            path: 'role',
            name: 'ProjectRole',
            component: () => import('@/views/Project/Role.vue'),
            meta: { title: '角色管理' }
          },
          {
            path: 'permission',
            name: 'ProjectPermission',
            component: () => import('@/views/Project/Permission.vue'),
            meta: { title: '权限配置' }
          }
        ]
      },
    ]
  },

  // 捕获所有未匹配路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...authRoutes]
})

// 设置路由守卫
setupRouterGuards(router)

export default router
