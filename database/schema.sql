-- ============================================
-- EasynetWeb 数据库结构（最终版本）
-- 系统定位：公司内部后台管理系统（私有化部署）
-- 数据库引擎：MySQL 8.0+
-- 字符集：utf8mb4
-- 更新日期：2025-12-25
-- ============================================

-- 1. 用户表
CREATE TABLE sys_user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    email VARCHAR(100) COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '手机号',
    real_name VARCHAR(50) COMMENT '真实姓名',
    avatar VARCHAR(255) COMMENT '头像URL',
    is_super_admin TINYINT NOT NULL DEFAULT 0 COMMENT '是否超级管理员：0-否，1-是',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    last_login_at DATETIME COMMENT '最后登录时间',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 2. 项目表
CREATE TABLE sys_project (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '项目ID',
    project_name VARCHAR(100) NOT NULL COMMENT '项目名称',
    description VARCHAR(500) COMMENT '项目描述',
    owner_id BIGINT UNSIGNED COMMENT '项目所有者ID',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-停用，1-正常',
    created_by BIGINT UNSIGNED COMMENT '创建人ID',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_owner_id (owner_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目表';

-- 3. 角色表（项目级）
CREATE TABLE sys_role (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '角色ID',
    project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    description VARCHAR(255) COMMENT '角色描述',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_project_id (project_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- 4. 用户-项目-角色关系表（一个用户在同一个项目只能有一个角色）
CREATE TABLE sys_user_project (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '关系ID',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_user_project (user_id, project_id),
    INDEX idx_project_id (project_id),
    INDEX idx_role_id (role_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户-项目-角色关系表';

-- 5. 菜单分组表
CREATE TABLE sys_menu_group (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '分组ID',
    group_code VARCHAR(50) NOT NULL UNIQUE COMMENT '分组编码',
    group_title VARCHAR(100) NOT NULL COMMENT '分组名称',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序号',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单分组表';

-- 6. 菜单表
CREATE TABLE sys_menu (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '菜单ID',
    group_id BIGINT UNSIGNED NOT NULL COMMENT '分组ID',
    parent_id BIGINT UNSIGNED DEFAULT NULL COMMENT '父菜单ID（预留扩展字段）',
    menu_code VARCHAR(50) NOT NULL UNIQUE COMMENT '菜单编码',
    menu_name VARCHAR(100) NOT NULL COMMENT '菜单名称',
    menu_type TINYINT NOT NULL DEFAULT 1 COMMENT '菜单类型：1-目录，2-菜单，3-按钮',
    icon VARCHAR(100) COMMENT '菜单图标',
    path VARCHAR(255) COMMENT '路由路径',
    component VARCHAR(255) COMMENT '组件路径',
    is_hidden TINYINT NOT NULL DEFAULT 0 COMMENT '是否隐藏：0-否，1-是',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序号',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_group_id (group_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- 7. 项目启用菜单表
CREATE TABLE sys_project_menu (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '关系ID',
    project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    menu_id BIGINT UNSIGNED NOT NULL COMMENT '菜单ID',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_project_menu (project_id, menu_id),
    INDEX idx_project_id (project_id),
    INDEX idx_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目启用菜单表';

-- 8. 角色-菜单关系表
CREATE TABLE sys_role_menu (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '关系ID',
    role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    menu_id BIGINT UNSIGNED NOT NULL COMMENT '菜单ID',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_role_menu (role_id, menu_id),
    INDEX idx_role_id (role_id),
    INDEX idx_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色-菜单关系表';

-- 9. 操作权限表（项目级，用于后端API鉴权）
CREATE TABLE sys_permission (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '权限ID',
    project_id BIGINT UNSIGNED NOT NULL COMMENT '项目ID',
    permission_code VARCHAR(100) NOT NULL COMMENT '权限编码（如：user:create）',
    permission_name VARCHAR(100) NOT NULL COMMENT '权限名称',
    description VARCHAR(255) COMMENT '权限描述',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_project_permission (project_id, permission_code),
    INDEX idx_project_id (project_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作权限表';

-- 10. 角色-权限关系表
CREATE TABLE sys_role_permission (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '关系ID',
    role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    permission_id BIGINT UNSIGNED NOT NULL COMMENT '权限ID',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色-权限关系表';

-- 11. 操作日志表
CREATE TABLE sys_operation_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '日志ID',
    user_id BIGINT UNSIGNED COMMENT '用户ID',
    project_id BIGINT UNSIGNED COMMENT '项目ID',
    module VARCHAR(50) COMMENT '模块名称',
    action VARCHAR(50) COMMENT '操作动作',
    description VARCHAR(500) COMMENT '操作描述',
    request_method VARCHAR(10) COMMENT '请求方法',
    request_url VARCHAR(255) COMMENT '请求URL',
    request_params TEXT COMMENT '请求参数',
    response_code INT COMMENT '响应状态码',
    ip VARCHAR(50) COMMENT 'IP地址',
    user_agent VARCHAR(500) COMMENT '用户代理',
    execution_time INT COMMENT '执行时长(ms)',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_user_id (user_id),
    INDEX idx_project_id (project_id),
    INDEX idx_created_at (created_at),
    INDEX idx_module_action (module, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- ============================================
-- 表结构说明
-- ============================================
/*
核心设计要点：

1. 系统定位：
   - 公司内部后台管理系统（私有化部署）
   - 每个公司独立部署、独立数据库
   - 不需要租户表

2. 用户-项目-角色：
   - 用户可以属于多个项目
   - 一个用户在一个项目只能有一个角色（UNIQUE约束）
   - 角色是项目级的

3. 菜单结构：
   - 分组→菜单（两级结构）
   - parent_id 预留扩展，支持多级菜单
   - 菜单和分组是全局的（平台级）

4. 权限层级：
   平台菜单（sys_menu）
       ⊇ 项目菜单（sys_project_menu）
       ⊇ 角色菜单（sys_role_menu）
       ⊇ 用户可见菜单

5. 操作权限：
   - sys_permission 是操作权限，用于后端API鉴权
   - 与菜单权限不同：菜单权限控制"能看什么"，操作权限控制"能做什么"
   - 权限是项目级的（不同项目可以有不同的权限定义）
   - 前端不做按钮级控制，由后端统一鉴权

6. 文档位置：
   - 数据库设计文档：docs/数据库设计.md
   - 菜单权限设计：docs/菜单权限设计.md
   - 任务计划：docs/任务计划.md
*/
