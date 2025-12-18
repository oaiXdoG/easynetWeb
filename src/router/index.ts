/**
 * 路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

// 静态路由
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '无权限' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
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
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '控制台' }
      },
      // 系统管理（平台级 - 超管）
      {
        path: 'system',
        name: 'System',
        redirect: '/system/user',
        meta: { title: '系统管理' },
        children: [
          {
            path: 'user',
            name: 'SystemUser',
            component: () => import('@/views/system/user/index.vue'),
            meta: { title: '账号管理', permissions: ['platform:user:view'] }
          },
          {
            path: 'project',
            name: 'SystemProject',
            component: () => import('@/views/system/project/index.vue'),
            meta: { title: '项目管理', permissions: ['platform:project:view'] }
          }
        ]
      },
      // 项目管理（项目级 - 项目管理员）
      {
        path: 'project-settings',
        name: 'ProjectSettings',
        redirect: '/project-settings/member',
        meta: { title: '项目设置' },
        children: [
          {
            path: 'member',
            name: 'ProjectMember',
            component: () => import('@/views/project/member/index.vue'),
            meta: { title: '成员管理' }
          },
          {
            path: 'role',
            name: 'ProjectRole',
            component: () => import('@/views/project/role/index.vue'),
            meta: { title: '角色管理' }
          },
          {
            path: 'permission',
            name: 'ProjectPermission',
            component: () => import('@/views/project/permission/index.vue'),
            meta: { title: '权限配置' }
          }
        ]
      }
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
