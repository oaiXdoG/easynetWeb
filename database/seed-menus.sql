-- ============================================
-- 菜单初始化数据（基于 src/config/menus.ts）
-- 使用方式：source database/seed-menus.sql
-- 或者：mysql -u root -p database_name < database/seed-menus.sql
-- 更新日期：2025-12-25
-- ============================================

-- 清空现有数据（谨慎使用）
-- TRUNCATE TABLE sys_role_menu;
-- TRUNCATE TABLE sys_role_menu_group;
-- TRUNCATE TABLE sys_project_menu;
-- TRUNCATE TABLE sys_menu;
-- TRUNCATE TABLE sys_menu_group;

-- ============================================
-- 1. 菜单分组数据
-- ============================================

-- 平台菜单分组
INSERT INTO sys_menu_group (id, group_code, group_title, sort_order, status) VALUES
(1, 'console', '控制台', 1, 1),
(2, 'log', '日志', 2, 1),
(3, 'project_settings', '项目设置', 3, 1);

-- 超管专属菜单分组
INSERT INTO sys_menu_group (id, group_code, group_title, sort_order, status) VALUES
(100, 'system', '系统管理', 100, 1);

-- ============================================
-- 2. 菜单数据
-- ============================================

-- ============ 控制台分组 (group_id = 1) ============
INSERT INTO sys_menu (id, group_id, menu_code, menu_name, menu_type, icon, path, component, sort_order, status) VALUES
(1, 1, 'dashboard', '数据看板', 2, 'dashboard', '/console/dashboard', 'Dashboard/Index.vue', 1, 1);

-- ============ 日志分组 (group_id = 2) ============
INSERT INTO sys_menu (id, group_id, menu_code, menu_name, menu_type, icon, path, component, sort_order, status) VALUES
(2, 2, 'log_app', '应用日志', 2, 'receipt_long', '/log/app', 'Log/Game.vue', 1, 1),
(3, 2, 'log_server', '服务器日志', 2, 'dns', '/log/server', 'Log/Server.vue', 2, 1);

-- ============ 项目设置分组 (group_id = 3) ============
INSERT INTO sys_menu (id, group_id, menu_code, menu_name, menu_type, icon, path, component, sort_order, status) VALUES
(4, 3, 'project_member', '成员管理', 2, 'people', '/project/member', 'Project/Member.vue', 1, 1),
(5, 3, 'project_role', '角色管理', 2, 'security', '/project/role', 'Project/Role.vue', 2, 1),
(6, 3, 'project_permission', '权限配置', 2, 'lock', '/project/permission', 'Project/Permission.vue', 3, 1);

-- ============ 系统管理分组 (group_id = 100) - 超管专属 ============
INSERT INTO sys_menu (id, group_id, menu_code, menu_name, menu_type, icon, path, component, sort_order, status) VALUES
(101, 100, 'system_user', '账号管理', 2, 'person', '/system/user', 'System/User.vue', 1, 1),
(102, 100, 'system_project', '项目管理', 2, 'folder', '/system/project', 'System/Project.vue', 2, 1);

-- ============================================
-- 3. 初始化超级管理员（可选）
-- ============================================

-- 创建超级管理员账号（密码需要加密后存储）
-- INSERT INTO sys_user (id, username, password, real_name, is_super_admin, status) VALUES
-- (1, 'admin', '加密后的密码', '超级管理员', 1, 1);

-- ============================================
-- 数据验证查询
-- ============================================

-- 查看所有菜单分组和菜单
SELECT
  g.id AS group_id,
  g.group_code,
  g.group_title,
  g.sort_order AS group_sort,
  g.status AS group_status,
  m.id AS menu_id,
  m.menu_code,
  m.menu_name,
  m.menu_type,
  m.icon,
  m.path,
  m.sort_order AS menu_sort,
  m.status AS menu_status
FROM sys_menu_group g
LEFT JOIN sys_menu m ON g.id = m.group_id
ORDER BY g.sort_order, m.sort_order;

-- 统计数据
SELECT '菜单分组数' AS item, COUNT(*) AS count FROM sys_menu_group
UNION ALL
SELECT '菜单项数' AS item, COUNT(*) AS count FROM sys_menu;
