/**
 * 菜单状态管理
 *
 * 核心逻辑：
 * 1. 前端定义全量菜单（src/config/menus.ts）
 * 2. 后端返回用户可见的 menuCode 列表
 * 3. 前端根据 menuCode 过滤出实际显示的菜单
 *
 * 权限层级：
 * 平台全量菜单 ⊇ 项目可用菜单 ⊇ 角色可用菜单 ⊇ 用户可见菜单
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PlatformMenuGroup } from '@/types'
import { useAuthStore } from '../auth'
import { useProjectStore } from '../project'
import { platformMenus, superAdminMenus, filterMenusByCode } from '@/config/menus'

export const useMenuStore = defineStore('menu', () => {
  // 状态
  const visibleMenuCodes = ref<string[]>([])
  const isMenuLoaded = ref(false)

  // 计算属性 - 根据 menuCode 过滤后的菜单
  const filteredMenus = computed<PlatformMenuGroup[]>(() => {
    const authStore = useAuthStore()

    // 超级管理员：显示所有菜单 + 超管专属菜单
    if (authStore.isSuperAdmin) {
      return [...platformMenus, ...superAdminMenus]
    }

    // 普通用户：根据 visibleMenuCodes 过滤
    if (visibleMenuCodes.value.length === 0) {
      return []
    }

    return filterMenusByCode(visibleMenuCodes.value, false)
  })

  /**
   * 加载菜单
   * 从项目上下文中获取 visibleMenuCodes
   */
  async function loadMenus() {
    const projectStore = useProjectStore()
    const authStore = useAuthStore()

    // 模拟 API 请求延迟
    await new Promise(resolve => setTimeout(resolve, 100))

    // 超级管理员不需要从后端获取菜单权限
    if (authStore.isSuperAdmin) {
      isMenuLoaded.value = true
      return
    }

    // 从项目上下文获取可见菜单
    if (projectStore.currentProject?.visibleMenuCodes) {
      visibleMenuCodes.value = projectStore.currentProject.visibleMenuCodes
    } else {
      visibleMenuCodes.value = []
    }

    isMenuLoaded.value = true
  }

  /**
   * 设置可见菜单（项目切换时调用）
   */
  function setVisibleMenuCodes(codes: string[]) {
    visibleMenuCodes.value = codes
  }

  /**
   * 清除菜单
   */
  function clearMenus() {
    visibleMenuCodes.value = []
    isMenuLoaded.value = false
  }

  /**
   * 根据路径查找菜单项
   */
  function findMenuByPath(path: string) {
    for (const group of filteredMenus.value) {
      const found = group.children.find(item => item.path === path)
      if (found) return found
    }
    return null
  }

  /**
   * 检查菜单是否可见
   */
  function isMenuVisible(menuCode: string): boolean {
    const authStore = useAuthStore()

    // 超级管理员可见所有菜单
    if (authStore.isSuperAdmin) {
      return true
    }

    return visibleMenuCodes.value.includes(menuCode)
  }

  return {
    // 状态
    visibleMenuCodes,
    isMenuLoaded,
    // 计算属性
    filteredMenus,
    // 方法
    loadMenus,
    setVisibleMenuCodes,
    clearMenus,
    findMenuByPath,
    isMenuVisible
  }
})
