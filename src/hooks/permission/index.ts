/**
 * 权限相关 Hook
 */

import { computed } from 'vue'
import { useAuthStore, usePermissionStore } from '@/stores'

export function usePermission() {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()

  // 当前用户权限列表
  const permissions = computed(() => permissionStore.permissions)

  // 是否是超级管理员
  const isSuperAdmin = computed(() => authStore.isSuperAdmin)

  /**
   * 检查是否有某个权限
   * @param permission 权限编码
   */
  function hasPermission(permission: string): boolean {
    // 超级管理员拥有所有权限
    if (isSuperAdmin.value) return true
    return permissionStore.hasPermission(permission)
  }

  /**
   * 检查是否有任意一个权限
   * @param permissionList 权限编码列表
   */
  function hasAnyPermission(permissionList: string[]): boolean {
    if (isSuperAdmin.value) return true
    return permissionStore.hasAnyPermission(permissionList)
  }

  /**
   * 检查是否有所有权限
   * @param permissionList 权限编码列表
   */
  function hasAllPermissions(permissionList: string[]): boolean {
    if (isSuperAdmin.value) return true
    return permissionStore.hasAllPermissions(permissionList)
  }

  return {
    permissions,
    isSuperAdmin,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }
}
