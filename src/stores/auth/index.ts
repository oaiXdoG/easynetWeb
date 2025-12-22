/**
 * 认证状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginParams, LoginResult, ProjectListItem } from '@/types'
import { tokenStorage, storage } from '@/utils/storage'
import { mockLoginResponse } from '@/mock/data'

const CURRENT_USER_KEY = 'easynet_current_user'
const USER_PROJECTS_KEY = 'easynet_user_projects'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(tokenStorage.getToken())
  const currentUser = ref<Pick<User, 'id' | 'username' | 'nickname' | 'avatar' | 'isSuperAdmin'> | null>(
    storage.get(CURRENT_USER_KEY)
  )
  const userProjects = ref<ProjectListItem[]>(storage.get(USER_PROJECTS_KEY) || [])

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!currentUser.value)
  const isSuperAdmin = computed(() => currentUser.value?.isSuperAdmin ?? false)

  // 登录
  async function login(params: LoginParams): Promise<LoginResult> {
    // TODO: 替换为真实 API 调用
    // const res = await authApi.login(params)

    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 500))

    if (params.username === 'superadmin' && params.password === 'admin123') {
      const mockData = {
        ...mockLoginResponse.data,
        user: {
          id: 1,
          username: 'superadmin',
          nickname: '超级管理员',
          avatar: '/avatars/superadmin.png',
          isSuperAdmin: true
        }
      }
      setLoginData(mockData)
      return mockData
    }

    if (params.username === 'zhangsan' && params.password === '123456') {
      setLoginData(mockLoginResponse.data)
      return mockLoginResponse.data
    }

    throw new Error('用户名或密码错误')
  }

  // 设置登录数据
  function setLoginData(data: LoginResult) {
    token.value = data.token
    currentUser.value = data.user
    userProjects.value = data.projects

    // 持久化
    tokenStorage.setToken(data.token)
    tokenStorage.setRefreshToken(data.refreshToken)
    tokenStorage.setTokenExpires(Date.now() + data.expiresIn * 1000)
    storage.set(CURRENT_USER_KEY, data.user)
    storage.set(USER_PROJECTS_KEY, data.projects)
  }

  // 登出
  async function logout() {
    // TODO: 调用登出 API
    // await authApi.logout()

    clearLoginData()
  }

  // 清除登录数据
  function clearLoginData() {
    token.value = null
    currentUser.value = null
    userProjects.value = []

    tokenStorage.clearToken()
    storage.remove(CURRENT_USER_KEY)
    storage.remove(USER_PROJECTS_KEY)
  }

  // 检查登录状态
  function checkAuth(): boolean {
    if (!token.value || tokenStorage.isTokenExpired()) {
      clearLoginData()
      return false
    }
    return true
  }

  return {
    // 状态
    token,
    currentUser,
    userProjects,
    // 计算属性
    isLoggedIn,
    isSuperAdmin,
    // 方法
    login,
    logout,
    checkAuth,
    clearLoginData
  }
})
