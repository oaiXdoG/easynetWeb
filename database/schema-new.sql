-- ====================================================================
-- EasyNet Web 数据库表结构（重新设计版本）
-- 数据库引擎：MySQL 8.0+
-- 字符集：utf8mb4_unicode_ci
-- ====================================================================

-- ====================================================================
-- 1. 菜单分组表
-- ====================================================================

CREATE TABLE sys_menu_group (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  group_code VARCHAR(50) NOT NULL UNIQUE COMMENT '分组编码（对应前端 groupCode）',
  group_title VARCHAR(100) NOT NULL COMMENT '分组标题',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序（数字越小越靠前）',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单分组表（映射前端 config/menus.ts）';

-- ====================================================================
-- 2. 菜单表
-- ====================================================================

CREATE TABLE sys_menu (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  group_id BIGINT UNSIGNED NOT NULL COMMENT '所属分组ID（外键 sys_menu_group.id）',
  menu_code VARCHAR(50) NOT NULL UNIQUE COMMENT '菜单编码（对应前端 menuCode）',
  menu_name VARCHAR(100) NOT NULL COMMENT '菜单名称',
  icon VARCHAR(100) COMMENT 'Material Icons 图标名',
  path VARCHAR(255) COMMENT '路由路径',
  component VARCHAR(255) COMMENT '组件路径（相对于 views 目录）',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序（数字越小越靠前）',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

  INDEX idx_group_id (group_id),
  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表（映射前端 config/menus.ts）';

-- ====================================================================
-- 3. 用户表
-- ====================================================================

CREATE TABLE sys_user (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名（登录账号）',
  password VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
  nickname VARCHAR(50) COMMENT '昵称',
  email VARCHAR(100) COMMENT '邮箱',
  phone VARCHAR(20) COMMENT '手机号',
  avatar VARCHAR(255) COMMENT '头像URL',
  is_super_admin TINYINT NOT NULL DEFAULT 0 COMMENT '是否超级管理员：0-否 1-是',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
  last_login_time DATETIME COMMENT '最后登录时间',
  last_login_ip VARCHAR(50) COMMENT '最后登录IP',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  deleted_at DATETIME COMMENT '删除时间（软删除）',

  INDEX idx_username (username),
  INDEX idx_is_super_admin (is_super_admin),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ====================================================================
-- 4. 项目表
-- ====================================================================

CREATE TABLE sys_project (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  project_code VARCHAR(50) NOT NULL UNIQUE COMMENT '项目编码（唯一标识）',
  project_name VARCHAR(100) NOT NULL COMMENT '项目名称',
  description VARCHAR(500) COMMENT '项目描述',
  logo VARCHAR(255) COMMENT '项目Logo URL',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序',
  created_by BIGINT UNSIGNED COMMENT '创建人ID',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  deleted_at DATETIME COMMENT '删除时间（软删除）',

  INDEX idx_project_code (project_code),
  INDEX idx_status (status),
  INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目表';

-- ====================================================================
-- 5. 角色表（项目级）
-- ====================================================================

CREATE TABLE sys_role (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID',
  role_code VARCHAR(50) NOT NULL COMMENT '角色编码',
  role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
  description VARCHAR(255) COMMENT '角色描述',
  is_project_admin TINYINT NOT NULL DEFAULT 0 COMMENT '是否项目管理员：0-否 1-是',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  deleted_at DATETIME COMMENT '删除时间（软删除）',

  UNIQUE KEY uk_project_role_code (project_id, role_code),
  INDEX idx_project_id (project_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表（项目级）';

-- ====================================================================
-- 6. 权限表
-- ====================================================================

CREATE TABLE sys_permission (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID（0表示平台级权限）',
  permission_code VARCHAR(100) NOT NULL COMMENT '权限编码',
  permission_name VARCHAR(100) NOT NULL COMMENT '权限名称',
  description VARCHAR(255) COMMENT '权限描述',
  permission_type VARCHAR(20) NOT NULL COMMENT '权限类型：menu-菜单 action-操作 data-数据',
  parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父权限ID（支持层级）',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

  UNIQUE KEY uk_project_permission_code (project_id, permission_code),
  INDEX idx_project_id (project_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_permission_type (permission_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- ====================================================================
-- 7. 用户标签表
-- ====================================================================

CREATE TABLE sys_user_tag (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID',
  tag_name VARCHAR(50) NOT NULL COMMENT '标签名称',
  tag_color VARCHAR(20) COMMENT '标签颜色',
  description VARCHAR(255) COMMENT '标签描述',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

  INDEX idx_project_id (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户标签表';

-- ====================================================================
-- 8. 操作日志表
-- ====================================================================

CREATE TABLE sys_operation_log (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  user_id BIGINT UNSIGNED COMMENT '操作用户ID',
  project_id BIGINT UNSIGNED COMMENT '项目ID',
  module VARCHAR(50) COMMENT '操作模块',
  action VARCHAR(50) COMMENT '操作类型',
  description VARCHAR(500) COMMENT '操作描述',
  request_method VARCHAR(10) COMMENT 'HTTP方法',
  request_url VARCHAR(255) COMMENT '请求URL',
  request_params TEXT COMMENT '请求参数',
  response_code INT COMMENT '响应状态码',
  ip VARCHAR(50) COMMENT 'IP地址',
  user_agent VARCHAR(500) COMMENT '用户代理',
  execution_time INT COMMENT '执行时长(ms)',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  INDEX idx_user_id (user_id),
  INDEX idx_project_id (project_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- ====================================================================
-- 关系表
-- ====================================================================

-- 9. 用户-项目关系表
CREATE TABLE sys_user_project (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
  is_default TINYINT NOT NULL DEFAULT 0 COMMENT '是否默认项目：0-否 1-是',
  joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_user_project (user_id, project_id),
  INDEX idx_user_id (user_id),
  INDEX idx_project_id (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-项目关系表';

-- 10. 用户-项目-角色关系表
CREATE TABLE sys_user_project_role (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
  role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_user_project_role (user_id, project_id, role_id),
  INDEX idx_user_id (user_id),
  INDEX idx_project_id (project_id),
  INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-项目-角色关系表';

-- 11. 角色-权限关系表
CREATE TABLE sys_role_permission (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
  permission_id BIGINT UNSIGNED NOT NULL COMMENT '权限ID',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_role_permission (role_id, permission_id),
  INDEX idx_role_id (role_id),
  INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色-权限关系表';

-- 12. 用户-标签关系表
CREATE TABLE sys_user_tag_relation (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
  tag_id BIGINT UNSIGNED NOT NULL COMMENT '标签ID',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_user_project_tag (user_id, project_id, tag_id),
  INDEX idx_user_id (user_id),
  INDEX idx_project_id (project_id),
  INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-标签关系表';

-- ====================================================================
-- 核心关系表：项目-菜单 & 角色-菜单
-- ====================================================================

-- 13. 项目-菜单关系表
CREATE TABLE sys_project_menu (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
  menu_id BIGINT UNSIGNED NOT NULL COMMENT '菜单ID（指向 sys_menu.id）',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_project_menu (project_id, menu_id),
  INDEX idx_project_id (project_id),
  INDEX idx_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目-菜单关系表（项目启用了哪些菜单）';

-- 14. 角色-菜单关系表
CREATE TABLE sys_role_menu (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
  menu_id BIGINT UNSIGNED NOT NULL COMMENT '菜单ID（指向 sys_menu.id）',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  UNIQUE KEY uk_role_menu (role_id, menu_id),
  INDEX idx_role_id (role_id),
  INDEX idx_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色-菜单关系表（角色可以看哪些菜单）';

-- ====================================================================
-- 表结构说明
-- ====================================================================

/*
核心设计要点：

1. 菜单数据分离：
   - sys_menu_group: 存储菜单分组（console、log、project_settings、system）
   - sys_menu: 存储具体菜单项（dashboard、log_app、project_member...）
   - 这两张表是纯平台数据，映射前端 config/menus.ts，不包含 project_id

2. 项目和菜单的关系：
   - sys_project_menu: 存储项目启用了哪些菜单（只存 menu_id）
   - 分组通过菜单的 group_id 自动推导，不需要单独存储

3. 角色和菜单的关系：
   - sys_role_menu: 存储角色可以看哪些菜单（只存 menu_id）
   - 角色是项目级的（sys_role.project_id）

4. 权限层级：
   平台菜单（sys_menu） ⊇ 项目菜单（sys_project_menu） ⊇ 角色菜单（sys_role_menu） ⊇ 用户可见菜单

5. 菜单同步：
   - 前端 config/menus.ts 是唯一数据源
   - 通过"同步菜单"API 将前端配置同步到 sys_menu_group 和 sys_menu 表
*/
