/**
 * 菜单状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuTreeNode } from '@/types'
import { useProjectStore } from './project'
import { mockGetMenusResponse } from '@/mock/data'

export const useMenuStore = defineStore('menu', () => {
  const projectStore = useProjectStore()

  // 状态
  const menus = ref<MenuTreeNode[]>([])
  const isMenuLoaded = ref(false)

  // 计算属性 - 可见菜单
  const visibleMenus = computed(() => {
    return filterVisibleMenus(menus.value)
  })

  // 过滤可见菜单
  function filterVisibleMenus(menuList: MenuTreeNode[]): MenuTreeNode[] {
    return menuList
      .filter(menu => menu.isVisible !== false)
      .map(menu => ({
        ...menu,
        children: menu.children ? filterVisibleMenus(menu.children) : undefined
      }))
  }

  // 加载菜单
  async function loadMenus() {
    if (!projectStore.projectId) {
      menus.value = []
      isMenuLoaded.value = false
      return
    }

    // TODO: 替换为真实 API 调用
    // const res = await menuApi.getMenus(projectStore.projectId)

    // 模拟加载菜单
    await new Promise(resolve => setTimeout(resolve, 200))

    // 使用项目上下文中的菜单或从 API 获取
    if (projectStore.currentProject?.menus) {
      menus.value = projectStore.currentProject.menus as MenuTreeNode[]
    } else {
      menus.value = mockGetMenusResponse.data as MenuTreeNode[]
    }

    isMenuLoaded.value = true
  }

  // 清除菜单
  function clearMenus() {
    menus.value = []
    isMenuLoaded.value = false
  }

  // 根据路径查找菜单
  function findMenuByPath(path: string): MenuTreeNode | null {
    const find = (list: MenuTreeNode[]): MenuTreeNode | null => {
      for (const menu of list) {
        if (menu.path === path) return menu
        if (menu.children) {
          const found = find(menu.children)
          if (found) return found
        }
      }
      return null
    }
    return find(menus.value)
  }

  return {
    // 状态
    menus,
    isMenuLoaded,
    // 计算属性
    visibleMenus,
    // 方法
    loadMenus,
    clearMenus,
    findMenuByPath
  }
})
