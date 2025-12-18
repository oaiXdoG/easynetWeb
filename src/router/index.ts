import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { cache } from '@/utils/cacheManager';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeRedirect.vue')
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('@/views/SystemHome.vue')
      },
      {
        path: 'system/projects',
        name: 'system-projects',
        component: () => import('@/views/SystemProjects.vue')
      },
      {
        path: 'system/accounts',
        name: 'system-accounts',
        component: () => import('@/views/SystemAccounts.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingsHome.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 简单的登录守卫：非公开路由需登录
router.beforeEach((to, _from, next) => {
  const user = cache.getUserInfo();

  if (to.meta.public) {
    // 已登录访问登录页则直接跳转系统
    if (user && to.path === '/login') {
      next({ path: '/system' });
      return;
    }
    next();
    return;
  }

  if (!user) {
    next({ path: '/login', query: { redirect: to.fullPath } });
    return;
  }

  next();
});

export default router;
