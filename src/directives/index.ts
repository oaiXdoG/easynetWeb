/**
 * 指令统一注册
 */

import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

export function setupDirectives(app: App) {
  setupPermissionDirective(app)
}
