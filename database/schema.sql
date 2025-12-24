-- 1. 用户表
CREATE TABLE sys_user (
                          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          username VARCHAR(50) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          is_super_admin TINYINT NOT NULL DEFAULT 0
);

-- 2. 项目表
CREATE TABLE sys_project (
                             id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             project_name VARCHAR(100) NOT NULL
);

-- 3. 角色表（项目级，无 role_code）
CREATE TABLE sys_role (
                          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          project_id BIGINT UNSIGNED NOT NULL,
                          role_name VARCHAR(50) NOT NULL,
                          INDEX idx_project_id (project_id)
);

-- 4. 用户-项目-角色关系表（一个用户在同一个项目只能有一个角色）
CREATE TABLE sys_user_project (
                                  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                  user_id BIGINT UNSIGNED NOT NULL,
                                  project_id BIGINT UNSIGNED NOT NULL,
                                  role_id BIGINT UNSIGNED NOT NULL,
                                  UNIQUE KEY uk_user_project (user_id, project_id),  -- 强制唯一
                                  INDEX idx_project_id (project_id)
);

-- 5. 菜单分组表
CREATE TABLE sys_menu_group (
                                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                group_code VARCHAR(50) NOT NULL UNIQUE,
                                group_title VARCHAR(100) NOT NULL,
                                sort_order INT NOT NULL DEFAULT 0
);

-- 6. 菜单表
CREATE TABLE sys_menu (
                          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          group_id BIGINT UNSIGNED NOT NULL,
                          menu_code VARCHAR(50) NOT NULL UNIQUE,
                          menu_name VARCHAR(100) NOT NULL,
                          icon VARCHAR(100),
                          path VARCHAR(255),
                          component VARCHAR(255),
                          sort_order INT NOT NULL DEFAULT 0,
                          INDEX idx_group_id (group_id)
);

-- 7. 项目启用菜单表
CREATE TABLE sys_project_menu (
                                  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                  project_id BIGINT UNSIGNED NOT NULL,
                                  menu_id BIGINT UNSIGNED NOT NULL,
                                  UNIQUE KEY uk_project_menu (project_id, menu_id)
);

-- 8. 角色-菜单分组关系表（必须先分配分组）
CREATE TABLE sys_role_menu_group (
                                     id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                     role_id BIGINT UNSIGNED NOT NULL,
                                     menu_group_id BIGINT UNSIGNED NOT NULL,
                                     UNIQUE KEY uk_role_menu_group (role_id, menu_group_id)
);

-- 9. 角色-菜单关系表（菜单必须属于已分配的分组）
CREATE TABLE sys_role_menu (
                               id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                               role_id BIGINT UNSIGNED NOT NULL,
                               menu_id BIGINT UNSIGNED NOT NULL,
                               UNIQUE KEY uk_role_menu (role_id, menu_id)
);

-- 10. 操作权限表
CREATE TABLE sys_permission (
                                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                project_id BIGINT UNSIGNED NOT NULL,
                                permission_code VARCHAR(100) NOT NULL,
                                permission_name VARCHAR(100) NOT NULL,
                                description VARCHAR(255),
                                UNIQUE KEY uk_project_permission (project_id, permission_code),
                                INDEX idx_project_id (project_id)
);

-- 11. 角色-权限关系表
CREATE TABLE sys_role_permission (
                                     id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                     role_id BIGINT UNSIGNED NOT NULL,
                                     permission_id BIGINT UNSIGNED NOT NULL,
                                     UNIQUE KEY uk_role_permission (role_id, permission_id)
);

-- 12. 操作日志表
CREATE TABLE sys_operation_log (
                                   id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                   user_id BIGINT UNSIGNED,
                                   project_id BIGINT UNSIGNED,
                                   module VARCHAR(50),
                                   action VARCHAR(50),
                                   description VARCHAR(500),
                                   request_method VARCHAR(10),
                                   request_url VARCHAR(255),
                                   request_params TEXT,
                                   response_code INT,
                                   ip VARCHAR(50),
                                   user_agent VARCHAR(500),
                                   execution_time INT,
                                   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                   INDEX idx_user_id (user_id),
                                   INDEX idx_project_id (project_id),
                                   INDEX idx_created_at (created_at)
);