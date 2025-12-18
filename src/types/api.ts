/**
 * API 响应相关类型定义
 */

// 通用 API 响应
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页结果
export interface PageResult<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 分页参数
export interface PageParams {
  page?: number
  pageSize?: number
}
