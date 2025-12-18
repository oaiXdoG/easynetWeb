import { Setting, Collection, User } from '@element-plus/icons-vue';
import type { ModuleConfig } from '@/types';

/**
 * 动态模块注册
 */
const MODULE_REGISTRY: Record<string, ModuleConfig> = {};

const systemModule: ModuleConfig = {
  key: 'system',
  name: '系统设置',
  icon: Setting,
  path: '/system',
  children: [
    {
      key: 'projects',
      name: '项目管理',
      icon: Collection,
      path: '/system/projects'
    },
    {
      key: 'accounts',
      name: '账户管理',
      icon: User,
      path: '/system/accounts'
    }
  ]
};

MODULE_REGISTRY['system'] = systemModule;

export const ADMIN_CONFIG = {
  modules: ['system'],
  enableProjectSwitch: false
};

export function registerModule(moduleConfig: ModuleConfig) {
  if (!moduleConfig.key) {
    throw new Error('模块配置必须包含 key');
  }
  MODULE_REGISTRY[moduleConfig.key] = moduleConfig;
}

export function getModule(key: string) {
  return MODULE_REGISTRY[key];
}

export function getAllModules(): ModuleConfig[] {
  return Object.values(MODULE_REGISTRY);
}

export function isAdminUser(username: string) {
  return username === 'admin';
}

export function getAdminMenus(): ModuleConfig[] {
  return ADMIN_CONFIG.modules
    .map((key) => MODULE_REGISTRY[key])
    .filter((m): m is ModuleConfig => Boolean(m));
}

export function getUserModules(username: string, moduleKeys?: string[]): ModuleConfig[] {
  if (isAdminUser(username)) return getAdminMenus();
  if (!moduleKeys || moduleKeys.length === 0) return [];
  return moduleKeys
    .map((key) => MODULE_REGISTRY[key])
    .filter((m): m is ModuleConfig => Boolean(m));
}

export function shouldShowProjectSwitch(username: string) {
  return !isAdminUser(username);
}
