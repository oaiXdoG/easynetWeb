/**
 * 菜单状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SidebarMenuGroup } from '@/types'
import { useAuthStore } from '../auth'
import { mockProjectMenus, mockSuperAdminMenus } from '@/mock/data'

export const useMenuStore = defineStore('menu', () => {
  // 状态
  const menuGroups = ref<SidebarMenuGroup[]>([])
  const isMenuLoaded = ref(false)

  // 计算属性 - 可见菜单分组
  const visibleMenuGroups = computed(() => {
    return menuGroups.value
      .map(group => ({
        ...group,
        children: group.children.filter(item => item.isVisible !== false)
      }))
      .filter(group => group.children.length > 0)
  })

  // 加载菜单（模拟 API 请求）
  async function loadMenus() {
    const authStore = useAuthStore()

    // 模拟 API 请求延迟
    await new Promise(resolve => setTimeout(resolve, 200))

    // 模拟从后端获取菜单数据
    // TODO: 替换为真实 API 调用
    // const res = await menuApi.getMenus(projectStore.projectId)

    // 基础菜单（所有用户都有）
    const baseMenus = [...mockProjectMenus] as SidebarMenuGroup[]

    // 超级管理员额外菜单
    if (authStore.isSuperAdmin) {
      menuGroups.value = [...baseMenus, ...mockSuperAdminMenus] as SidebarMenuGroup[]
    } else {
      menuGroups.value = baseMenus
    }

    isMenuLoaded.value = true
  }

  // 清除菜单
  function clearMenus() {
    menuGroups.value = []
    isMenuLoaded.value = false
  }

  // 根据路径查找菜单项
  function findMenuByPath(path: string) {
    for (const group of menuGroups.value) {
      const found = group.children.find(item => item.path === path)
      if (found) return found
    }
    return null
  }

  return {
    // 状态
    menuGroups,
    isMenuLoaded,
    // 计算属性
    visibleMenuGroups,
    // 方法
    loadMenus,
    clearMenus,
    findMenuByPath
  }
})
