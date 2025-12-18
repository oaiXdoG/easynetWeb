/**
 * 权限指令 v-permission
 *
 * 用法：
 * v-permission="'user:create'"           - 单个权限
 * v-permission="['user:create', 'user:edit']"  - 多个权限（满足任意一个）
 * v-permission.all="['user:create', 'user:edit']"  - 多个权限（必须全部满足）
 */

import type { App, Directive, DirectiveBinding } from 'vue'
import { useAuthStore, usePermissionStore } from '@/stores'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()

  const { value, modifiers } = binding

  if (!value) return

  // 超级管理员拥有所有权限
  if (authStore.isSuperAdmin) return

  const permissions = Array.isArray(value) ? value : [value]

  let hasPermission = false

  if (modifiers.all) {
    // 必须拥有所有权限
    hasPermission = permissionStore.hasAllPermissions(permissions)
  } else {
    // 拥有任意一个权限即可
    hasPermission = permissionStore.hasAnyPermission(permissions)
  }

  if (!hasPermission) {
    // 没有权限，移除元素
    el.parentNode?.removeChild(el)
  }
}

const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective)
}

export default permissionDirective
