/**
 * 认证相关 Hook
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProjectStore, useMenuStore } from '@/stores'
import type { LoginParams } from '@/types'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const projectStore = useProjectStore()
  const menuStore = useMenuStore()

  // 是否已登录
  const isLoggedIn = computed(() => authStore.isLoggedIn)

  // 当前用户
  const currentUser = computed(() => authStore.currentUser)

  // 是否是超级管理员
  const isSuperAdmin = computed(() => authStore.isSuperAdmin)

  /**
   * 登录
   * @param params 登录参数
   */
  async function login(params: LoginParams) {
    const result = await authStore.login(params)

    // 设置当前项目
    projectStore.setCurrentProject(result.currentProject)

    // 加载菜单
    await menuStore.loadMenus()

    return result
  }

  /**
   * 登出
   */
  async function logout() {
    await authStore.logout()
    projectStore.clearCurrentProject()
    menuStore.clearMenus()
    router.push('/login')
  }

  /**
   * 检查登录状态
   */
  function checkAuth(): boolean {
    return authStore.checkAuth()
  }

  return {
    isLoggedIn,
    currentUser,
    isSuperAdmin,
    login,
    logout,
    checkAuth
  }
}
