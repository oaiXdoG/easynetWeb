/**
 * 权限状态管理
 */

import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useProjectStore } from '../project'

export const usePermissionStore = defineStore('permission', () => {
  const projectStore = useProjectStore()

  // 状态 - 从项目上下文获取权限
  const permissions = computed(() => projectStore.currentProject?.permissions ?? [])

  // 检查是否有某个权限
  function hasPermission(permission: string): boolean {
    // 超级管理员拥有所有权限（需要从 authStore 获取）
    return permissions.value.includes(permission)
  }

  // 检查是否有任意一个权限
  function hasAnyPermission(permissionList: string[]): boolean {
    return permissionList.some(p => hasPermission(p))
  }

  // 检查是否有所有权限
  function hasAllPermissions(permissionList: string[]): boolean {
    return permissionList.every(p => hasPermission(p))
  }

  return {
    // 状态
    permissions,
    // 方法
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }
})
