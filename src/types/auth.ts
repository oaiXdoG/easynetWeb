/**
 * 认证相关类型定义
 */

import type { User } from './user'
import type { ProjectListItem, CurrentProjectContext } from './project'

// 登录参数
export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

// 登录响应数据
export interface LoginResult {
  token: string
  refreshToken: string
  expiresIn: number
  user: Pick<User, 'id' | 'username' | 'nickname' | 'avatar' | 'isSuperAdmin'>
  projects: ProjectListItem[]
  currentProject: CurrentProjectContext
}

// Token 信息
export interface TokenInfo {
  token: string
  refreshToken: string
  expiresIn: number
  expiresAt: number
}
