-- ============================================================
-- 多应用管理平台 - 数据库表结构设计
-- 基于 easynetWeb.md 设计文档
-- ============================================================

-- ------------------------------------------------------------
-- 1. 用户表 (平台级账号)
-- ------------------------------------------------------------
CREATE TABLE `sys_user` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名（登录账号）',
    `password` VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
    `nickname` VARCHAR(50) DEFAULT NULL COMMENT '昵称',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    `is_super_admin` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否超级管理员：0-否，1-是',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `last_login_time` DATETIME DEFAULT NULL COMMENT '最后登录时间',
    `last_login_ip` VARCHAR(50) DEFAULT NULL COMMENT '最后登录IP',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间（软删除）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    KEY `idx_status` (`status`),
    KEY `idx_is_super_admin` (`is_super_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表（平台级账号）';

-- ------------------------------------------------------------
-- 2. 项目表 (应用/项目)
-- ------------------------------------------------------------
CREATE TABLE `sys_project` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '项目ID',
    `project_code` VARCHAR(50) NOT NULL COMMENT '项目编码（唯一标识）',
    `project_name` VARCHAR(100) NOT NULL COMMENT '项目名称',
    `description` VARCHAR(500) DEFAULT NULL COMMENT '项目描述',
    `logo` VARCHAR(255) DEFAULT NULL COMMENT '项目Logo',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `created_by` BIGINT UNSIGNED DEFAULT NULL COMMENT '创建人ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间（软删除）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_project_code` (`project_code`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目表（应用）';

-- ------------------------------------------------------------
-- 3. 角色表 (项目内角色)
-- ------------------------------------------------------------
CREATE TABLE `sys_role` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID',
    `role_code` VARCHAR(50) NOT NULL COMMENT '角色编码',
    `role_name` VARCHAR(50) NOT NULL COMMENT '角色名称',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '角色描述',
    `is_project_admin` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否项目管理员：0-否，1-是',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间（软删除）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_project_role_code` (`project_id`, `role_code`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表（项目内角色）';

-- ------------------------------------------------------------
-- 4. 权限表 (能力权限)
-- ------------------------------------------------------------
CREATE TABLE `sys_permission` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID（0表示平台级权限）',
    `permission_code` VARCHAR(100) NOT NULL COMMENT '权限编码',
    `permission_name` VARCHAR(100) NOT NULL COMMENT '权限名称',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '权限描述',
    `permission_type` VARCHAR(20) NOT NULL DEFAULT 'action' COMMENT '权限类型：menu-菜单，action-操作，data-数据',
    `parent_id` BIGINT UNSIGNED DEFAULT 0 COMMENT '父权限ID',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_project_permission_code` (`project_id`, `permission_code`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_parent_id` (`parent_id`),
    KEY `idx_permission_type` (`permission_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表（能力权限）';

-- ------------------------------------------------------------
-- 5. 菜单表 (界面菜单)
-- ------------------------------------------------------------
CREATE TABLE `sys_menu` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '所属项目ID（0表示平台级菜单）',
    `parent_id` BIGINT UNSIGNED DEFAULT 0 COMMENT '父菜单ID',
    `menu_code` VARCHAR(50) NOT NULL COMMENT '菜单编码',
    `menu_name` VARCHAR(50) NOT NULL COMMENT '菜单名称',
    `menu_type` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '菜单类型：1-目录，2-菜单，3-按钮',
    `icon` VARCHAR(100) DEFAULT NULL COMMENT '菜单图标',
    `path` VARCHAR(255) DEFAULT NULL COMMENT '路由路径',
    `component` VARCHAR(255) DEFAULT NULL COMMENT '组件路径',
    `redirect` VARCHAR(255) DEFAULT NULL COMMENT '重定向地址',
    `is_visible` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否可见：0-隐藏，1-显示',
    `is_cache` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否缓存：0-否，1-是',
    `is_external` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否外链：0-否，1-是',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_project_menu_code` (`project_id`, `menu_code`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_parent_id` (`parent_id`),
    KEY `idx_menu_type` (`menu_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表';

-- ------------------------------------------------------------
-- 6. 用户-项目关联表 (用户与项目的关系)
-- ------------------------------------------------------------
CREATE TABLE `sys_user_project` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    `is_default` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否默认项目：0-否，1-是',
    `joined_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_project` (`user_id`, `project_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-项目关联表';

-- ------------------------------------------------------------
-- 7. 用户-项目-角色关联表 (用户在项目内的角色)
-- ------------------------------------------------------------
CREATE TABLE `sys_user_project_role` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    `role_id` BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_project_role` (`user_id`, `project_id`, `role_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-项目-角色关联表';

-- ------------------------------------------------------------
-- 8. 角色-权限关联表 (角色拥有的权限)
-- ------------------------------------------------------------
CREATE TABLE `sys_role_permission` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `role_id` BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    `permission_id` BIGINT UNSIGNED NOT NULL COMMENT '权限ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_role_permission` (`role_id`, `permission_id`),
    KEY `idx_role_id` (`role_id`),
    KEY `idx_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色-权限关联表';

-- ------------------------------------------------------------
-- 9. 菜单-权限关联表 (菜单关联的权限)
-- ------------------------------------------------------------
CREATE TABLE `sys_menu_permission` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `menu_id` BIGINT UNSIGNED NOT NULL COMMENT '菜单ID',
    `permission_id` BIGINT UNSIGNED NOT NULL COMMENT '权限ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_menu_permission` (`menu_id`, `permission_id`),
    KEY `idx_menu_id` (`menu_id`),
    KEY `idx_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单-权限关联表';

-- ------------------------------------------------------------
-- 10. 用户标签表 (用于管理与筛选，不参与权限判断)
-- ------------------------------------------------------------
CREATE TABLE `sys_user_tag` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    `tag_name` VARCHAR(50) NOT NULL COMMENT '标签名称',
    `tag_color` VARCHAR(20) DEFAULT NULL COMMENT '标签颜色',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '标签描述',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户标签表';

-- ------------------------------------------------------------
-- 11. 用户-标签关联表
-- ------------------------------------------------------------
CREATE TABLE `sys_user_tag_relation` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    `project_id` BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    `tag_id` BIGINT UNSIGNED NOT NULL COMMENT '标签ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_project_tag` (`user_id`, `project_id`, `tag_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户-标签关联表';

-- ------------------------------------------------------------
-- 12. 操作日志表 (审计追踪)
-- ------------------------------------------------------------
CREATE TABLE `sys_operation_log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `user_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '操作用户ID',
    `project_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '项目ID',
    `module` VARCHAR(50) DEFAULT NULL COMMENT '操作模块',
    `action` VARCHAR(50) DEFAULT NULL COMMENT '操作类型',
    `description` VARCHAR(500) DEFAULT NULL COMMENT '操作描述',
    `request_method` VARCHAR(10) DEFAULT NULL COMMENT '请求方法',
    `request_url` VARCHAR(255) DEFAULT NULL COMMENT '请求URL',
    `request_params` TEXT COMMENT '请求参数',
    `response_code` INT DEFAULT NULL COMMENT '响应状态码',
    `ip` VARCHAR(50) DEFAULT NULL COMMENT 'IP地址',
    `user_agent` VARCHAR(500) DEFAULT NULL COMMENT '用户代理',
    `execution_time` INT DEFAULT NULL COMMENT '执行时长(ms)',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_project_id` (`project_id`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';
