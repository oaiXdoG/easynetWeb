import type { Component } from 'vue';

export interface ApiResponse<T = unknown> {
  code: number;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  token: string;
  apps?: any[];
}

export interface UserInfo {
  username: string;
  token?: string;
  password?: string;
}

export interface ModuleConfig {
  key: string;
  name: string;
  icon?: Component;
  path: string;
  children?: ModuleConfig[];
}

export interface AppConfig {
  id: string;
  name: string;
  appId?: string;
  appName?: string;
  choice?: boolean;
}

export interface MenuApiItem {
  key: string;
  name: string;
  path: string;
  children?: MenuApiItem[];
}

export interface MenuClickParams {
  index: string;
  indexPath: string[];
}

export interface TabItem {
  key: string;
  title: string;
  icon?: Component;
  path: string;
  closable?: boolean;
  moduleKey?: string;
  subModuleKey?: string;
}
