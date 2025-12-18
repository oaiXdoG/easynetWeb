/**
 * 用户相关类型定义
 */

// 用户基础信息
export interface User {
  id: number
  username: string
  nickname: string
  email: string | null
  phone: string | null
  avatar: string | null
  isSuperAdmin: boolean
  status: number
  lastLoginTime: string | null
  lastLoginIp: string | null
  createdAt: string
  updatedAt: string
}

// 用户列表项（简化版）
export interface UserListItem {
  id: number
  username: string
  nickname: string
  email: string | null
  phone: string | null
  avatar: string | null
  isSuperAdmin: boolean
  status: number
  createdAt: string
}

// 创建用户参数
export interface CreateUserParams {
  username: string
  password: string
  nickname: string
  email?: string
  phone?: string
  avatar?: string
}

// 更新用户参数
export interface UpdateUserParams {
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
  status?: number
}

// 用户查询参数
export interface UserQueryParams {
  keyword?: string
  status?: number
  page?: number
  pageSize?: number
}
