/**
 * API 统一导出
 *
 * 使用方式：
 * import { authApi, systemApi, projectApi } from '@/api'
 *
 * authApi.login(...)
 * systemApi.getUserList(...)
 * projectApi.getMemberList(...)
 */

import * as authApi from './auth'
import * as systemApi from './system'
import * as projectApi from './project'

export { authApi, systemApi, projectApi }

// 也导出 request 工具
export { request } from './request'
