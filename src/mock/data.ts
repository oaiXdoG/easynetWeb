/**
 * 多应用管理平台 - 模板数据 (Mock Data)
 * 基于 database/schema.sql 表结构
 * 用于前端开发阶段的数据模拟
 */

// ============================================================
// 1. 用户数据 (sys_user)
// ============================================================
export const mockUsers = [
  {
    id: 1,
    username: 'superadmin',
    password: '$2a$10$xxxxx', // 加密后的密码，原文: admin123
    nickname: '超级管理员',
    email: 'superadmin@easynet.com',
    phone: '13800000001',
    avatar: '/avatars/superadmin.png',
    isSuperAdmin: true,
    status: 1,
    lastLoginTime: '2025-12-18 10:30:00',
    lastLoginIp: '192.168.1.100',
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-12-18 10:30:00',
    deletedAt: null
  },
  {
    id: 2,
    username: 'zhangsan',
    password: '$2a$10$xxxxx',
    nickname: '张三',
    email: 'zhangsan@easynet.com',
    phone: '13800000002',
    avatar: '/avatars/zhangsan.png',
    isSuperAdmin: false,
    status: 1,
    lastLoginTime: '2025-12-18 09:00:00',
    lastLoginIp: '192.168.1.101',
    createdAt: '2025-06-01 10:00:00',
    updatedAt: '2025-12-18 09:00:00',
    deletedAt: null
  },
  {
    id: 3,
    username: 'lisi',
    password: '$2a$10$xxxxx',
    nickname: '李四',
    email: 'lisi@easynet.com',
    phone: '13800000003',
    avatar: '/avatars/lisi.png',
    isSuperAdmin: false,
    status: 1,
    lastLoginTime: '2025-12-17 14:20:00',
    lastLoginIp: '192.168.1.102',
    createdAt: '2025-06-15 14:00:00',
    updatedAt: '2025-12-17 14:20:00',
    deletedAt: null
  },
  {
    id: 4,
    username: 'wangwu',
    password: '$2a$10$xxxxx',
    nickname: '王五',
    email: 'wangwu@easynet.com',
    phone: '13800000004',
    avatar: '/avatars/wangwu.png',
    isSuperAdmin: false,
    status: 1,
    lastLoginTime: '2025-12-16 11:00:00',
    lastLoginIp: '192.168.1.103',
    createdAt: '2025-07-01 09:00:00',
    updatedAt: '2025-12-16 11:00:00',
    deletedAt: null
  },
  {
    id: 5,
    username: 'zhaoliu',
    password: '$2a$10$xxxxx',
    nickname: '赵六',
    email: 'zhaoliu@easynet.com',
    phone: '13800000005',
    avatar: null,
    isSuperAdmin: false,
    status: 0, // 已禁用
    lastLoginTime: '2025-11-01 10:00:00',
    lastLoginIp: '192.168.1.104',
    createdAt: '2025-08-01 10:00:00',
    updatedAt: '2025-11-15 10:00:00',
    deletedAt: null
  }
]

// ============================================================
// 2. 项目数据 (sys_project)
// ============================================================
export const mockProjects = [
  {
    id: 1,
    projectCode: 'ecommerce',
    projectName: '电商管理系统',
    description: '用于管理电商平台的商品、订单、用户等业务',
    logo: '/logos/ecommerce.png',
    status: 1,
    sortOrder: 1,
    createdBy: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-12-01 10:00:00',
    deletedAt: null
  },
  {
    id: 2,
    projectCode: 'crm',
    projectName: 'CRM客户管理',
    description: '客户关系管理系统，管理客户、商机、合同等',
    logo: '/logos/crm.png',
    status: 1,
    sortOrder: 2,
    createdBy: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-12-01 10:00:00',
    deletedAt: null
  },
  {
    id: 3,
    projectCode: 'oa',
    projectName: 'OA办公系统',
    description: '企业内部办公系统，包含审批、考勤、公告等功能',
    logo: '/logos/oa.png',
    status: 1,
    sortOrder: 3,
    createdBy: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-12-01 10:00:00',
    deletedAt: null
  },
  {
    id: 4,
    projectCode: 'warehouse',
    projectName: '仓储管理系统',
    description: '仓库进销存管理',
    logo: '/logos/warehouse.png',
    status: 0, // 已禁用
    sortOrder: 4,
    createdBy: 1,
    createdAt: '2025-04-01 10:00:00',
    updatedAt: '2025-10-01 10:00:00',
    deletedAt: null
  }
]

// ============================================================
// 3. 角色数据 (sys_role) - 按项目划分
// ============================================================
export const mockRoles = [
  // === 电商管理系统 (project_id: 1) ===
  {
    id: 1,
    projectId: 1,
    roleCode: 'ecommerce_admin',
    roleName: '电商项目管理员',
    description: '电商系统的项目管理员，拥有全部权限',
    isProjectAdmin: true,
    status: 1,
    sortOrder: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00',
    deletedAt: null
  },
  {
    id: 2,
    projectId: 1,
    roleCode: 'ecommerce_operator',
    roleName: '运营人员',
    description: '负责商品管理、活动管理',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 2,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00',
    deletedAt: null
  },
  {
    id: 3,
    projectId: 1,
    roleCode: 'ecommerce_customer_service',
    roleName: '客服人员',
    description: '处理订单、售后问题',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 3,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00',
    deletedAt: null
  },
  // === CRM客户管理 (project_id: 2) ===
  {
    id: 4,
    projectId: 2,
    roleCode: 'crm_admin',
    roleName: 'CRM项目管理员',
    description: 'CRM系统的项目管理员',
    isProjectAdmin: true,
    status: 1,
    sortOrder: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00',
    deletedAt: null
  },
  {
    id: 5,
    projectId: 2,
    roleCode: 'crm_sales',
    roleName: '销售人员',
    description: '管理客户和商机',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 2,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00',
    deletedAt: null
  },
  {
    id: 6,
    projectId: 2,
    roleCode: 'crm_sales_manager',
    roleName: '销售经理',
    description: '管理销售团队，查看销售报表',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 3,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00',
    deletedAt: null
  },
  // === OA办公系统 (project_id: 3) ===
  {
    id: 7,
    projectId: 3,
    roleCode: 'oa_admin',
    roleName: 'OA项目管理员',
    description: 'OA系统的项目管理员',
    isProjectAdmin: true,
    status: 1,
    sortOrder: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00',
    deletedAt: null
  },
  {
    id: 8,
    projectId: 3,
    roleCode: 'oa_employee',
    roleName: '普通员工',
    description: '可发起审批、查看公告',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 2,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00',
    deletedAt: null
  },
  {
    id: 9,
    projectId: 3,
    roleCode: 'oa_hr',
    roleName: 'HR人事',
    description: '管理考勤、人事审批',
    isProjectAdmin: false,
    status: 1,
    sortOrder: 3,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00',
    deletedAt: null
  }
]

// ============================================================
// 4. 权限数据 (sys_permission) - 按项目划分
// ============================================================
export const mockPermissions = [
  // === 平台级权限 (project_id: 0) ===
  {
    id: 1,
    projectId: 0,
    permissionCode: 'platform:project:create',
    permissionName: '创建项目',
    description: '创建新项目',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  {
    id: 2,
    projectId: 0,
    permissionCode: 'platform:project:delete',
    permissionName: '删除项目',
    description: '删除项目',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  {
    id: 3,
    projectId: 0,
    permissionCode: 'platform:user:create',
    permissionName: '创建账号',
    description: '创建平台账号',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  // === 电商管理系统权限 (project_id: 1) ===
  {
    id: 10,
    projectId: 1,
    permissionCode: 'ecommerce:product:view',
    permissionName: '查看商品',
    description: '查看商品列表和详情',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 11,
    projectId: 1,
    permissionCode: 'ecommerce:product:create',
    permissionName: '创建商品',
    description: '创建新商品',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 12,
    projectId: 1,
    permissionCode: 'ecommerce:product:edit',
    permissionName: '编辑商品',
    description: '编辑商品信息',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 13,
    projectId: 1,
    permissionCode: 'ecommerce:product:delete',
    permissionName: '删除商品',
    description: '删除商品',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 4,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 14,
    projectId: 1,
    permissionCode: 'ecommerce:order:view',
    permissionName: '查看订单',
    description: '查看订单列表和详情',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 5,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 15,
    projectId: 1,
    permissionCode: 'ecommerce:order:process',
    permissionName: '处理订单',
    description: '处理订单发货、退款等',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 6,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 16,
    projectId: 1,
    permissionCode: 'ecommerce:member:manage',
    permissionName: '管理项目成员',
    description: '添加/移除项目成员，分配角色',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 7,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  // === CRM权限 (project_id: 2) ===
  {
    id: 20,
    projectId: 2,
    permissionCode: 'crm:customer:view',
    permissionName: '查看客户',
    description: '查看客户列表和详情',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 21,
    projectId: 2,
    permissionCode: 'crm:customer:create',
    permissionName: '创建客户',
    description: '创建新客户',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 22,
    projectId: 2,
    permissionCode: 'crm:customer:edit',
    permissionName: '编辑客户',
    description: '编辑客户信息',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 23,
    projectId: 2,
    permissionCode: 'crm:opportunity:view',
    permissionName: '查看商机',
    description: '查看商机列表和详情',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 4,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 24,
    projectId: 2,
    permissionCode: 'crm:opportunity:manage',
    permissionName: '管理商机',
    description: '创建、编辑、跟进商机',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 5,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 25,
    projectId: 2,
    permissionCode: 'crm:report:view',
    permissionName: '查看报表',
    description: '查看销售报表',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 6,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  // === OA权限 (project_id: 3) ===
  {
    id: 30,
    projectId: 3,
    permissionCode: 'oa:approval:view',
    permissionName: '查看审批',
    description: '查看审批列表',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 31,
    projectId: 3,
    permissionCode: 'oa:approval:submit',
    permissionName: '提交审批',
    description: '提交新的审批申请',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 32,
    projectId: 3,
    permissionCode: 'oa:approval:process',
    permissionName: '处理审批',
    description: '审批通过或拒绝',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 33,
    projectId: 3,
    permissionCode: 'oa:attendance:view',
    permissionName: '查看考勤',
    description: '查看自己的考勤记录',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 4,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 34,
    projectId: 3,
    permissionCode: 'oa:attendance:manage',
    permissionName: '管理考勤',
    description: '管理所有员工考勤',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 5,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 35,
    projectId: 3,
    permissionCode: 'oa:notice:view',
    permissionName: '查看公告',
    description: '查看公司公告',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 6,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 36,
    projectId: 3,
    permissionCode: 'oa:notice:publish',
    permissionName: '发布公告',
    description: '发布公司公告',
    permissionType: 'action',
    parentId: 0,
    sortOrder: 7,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  }
]

// ============================================================
// 5. 菜单数据 (sys_menu) - 按项目划分
// ============================================================
export const mockMenus = [
  // === 平台级菜单 (project_id: 0) ===
  {
    id: 1,
    projectId: 0,
    parentId: 0,
    menuCode: 'platform_dashboard',
    menuName: '控制台',
    menuType: 2,
    icon: 'Dashboard',
    path: '/dashboard',
    component: 'views/dashboard/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  {
    id: 2,
    projectId: 0,
    parentId: 0,
    menuCode: 'platform_system',
    menuName: '系统管理',
    menuType: 1,
    icon: 'Setting',
    path: '/system',
    component: null,
    redirect: '/system/user',
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  {
    id: 3,
    projectId: 0,
    parentId: 2,
    menuCode: 'platform_user',
    menuName: '账号管理',
    menuType: 2,
    icon: 'User',
    path: '/system/user',
    component: 'views/system/user/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  {
    id: 4,
    projectId: 0,
    parentId: 2,
    menuCode: 'platform_project',
    menuName: '项目管理',
    menuType: 2,
    icon: 'Folder',
    path: '/system/project',
    component: 'views/system/project/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-01 00:00:00',
    updatedAt: '2025-01-01 00:00:00'
  },
  // === 电商系统菜单 (project_id: 1) ===
  {
    id: 10,
    projectId: 1,
    parentId: 0,
    menuCode: 'ecommerce_dashboard',
    menuName: '工作台',
    menuType: 2,
    icon: 'Dashboard',
    path: '/ecommerce/dashboard',
    component: 'views/ecommerce/dashboard/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 11,
    projectId: 1,
    parentId: 0,
    menuCode: 'ecommerce_product',
    menuName: '商品管理',
    menuType: 1,
    icon: 'Goods',
    path: '/ecommerce/product',
    component: null,
    redirect: '/ecommerce/product/list',
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 12,
    projectId: 1,
    parentId: 11,
    menuCode: 'ecommerce_product_list',
    menuName: '商品列表',
    menuType: 2,
    icon: null,
    path: '/ecommerce/product/list',
    component: 'views/ecommerce/product/list',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 13,
    projectId: 1,
    parentId: 11,
    menuCode: 'ecommerce_product_category',
    menuName: '商品分类',
    menuType: 2,
    icon: null,
    path: '/ecommerce/product/category',
    component: 'views/ecommerce/product/category',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  {
    id: 14,
    projectId: 1,
    parentId: 0,
    menuCode: 'ecommerce_order',
    menuName: '订单管理',
    menuType: 2,
    icon: 'Document',
    path: '/ecommerce/order',
    component: 'views/ecommerce/order/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-01-15 10:00:00',
    updatedAt: '2025-01-15 10:00:00'
  },
  // === CRM菜单 (project_id: 2) ===
  {
    id: 20,
    projectId: 2,
    parentId: 0,
    menuCode: 'crm_dashboard',
    menuName: '工作台',
    menuType: 2,
    icon: 'Dashboard',
    path: '/crm/dashboard',
    component: 'views/crm/dashboard/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 21,
    projectId: 2,
    parentId: 0,
    menuCode: 'crm_customer',
    menuName: '客户管理',
    menuType: 2,
    icon: 'User',
    path: '/crm/customer',
    component: 'views/crm/customer/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 22,
    projectId: 2,
    parentId: 0,
    menuCode: 'crm_opportunity',
    menuName: '商机管理',
    menuType: 2,
    icon: 'TrendCharts',
    path: '/crm/opportunity',
    component: 'views/crm/opportunity/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  {
    id: 23,
    projectId: 2,
    parentId: 0,
    menuCode: 'crm_report',
    menuName: '销售报表',
    menuType: 2,
    icon: 'DataAnalysis',
    path: '/crm/report',
    component: 'views/crm/report/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 4,
    status: 1,
    createdAt: '2025-02-01 10:00:00',
    updatedAt: '2025-02-01 10:00:00'
  },
  // === OA菜单 (project_id: 3) ===
  {
    id: 30,
    projectId: 3,
    parentId: 0,
    menuCode: 'oa_dashboard',
    menuName: '工作台',
    menuType: 2,
    icon: 'Dashboard',
    path: '/oa/dashboard',
    component: 'views/oa/dashboard/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 1,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 31,
    projectId: 3,
    parentId: 0,
    menuCode: 'oa_approval',
    menuName: '审批中心',
    menuType: 2,
    icon: 'Stamp',
    path: '/oa/approval',
    component: 'views/oa/approval/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 2,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 32,
    projectId: 3,
    parentId: 0,
    menuCode: 'oa_attendance',
    menuName: '考勤管理',
    menuType: 2,
    icon: 'Clock',
    path: '/oa/attendance',
    component: 'views/oa/attendance/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 3,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  },
  {
    id: 33,
    projectId: 3,
    parentId: 0,
    menuCode: 'oa_notice',
    menuName: '公告管理',
    menuType: 2,
    icon: 'Bell',
    path: '/oa/notice',
    component: 'views/oa/notice/index',
    redirect: null,
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 4,
    status: 1,
    createdAt: '2025-03-01 10:00:00',
    updatedAt: '2025-03-01 10:00:00'
  }
]

// ============================================================
// 6. 用户-项目关联数据 (sys_user_project)
// ============================================================
export const mockUserProjects = [
  // 张三 - 属于电商和CRM两个项目
  { id: 1, userId: 2, projectId: 1, isDefault: true, joinedAt: '2025-06-01 10:00:00', createdAt: '2025-06-01 10:00:00' },
  { id: 2, userId: 2, projectId: 2, isDefault: false, joinedAt: '2025-06-01 10:00:00', createdAt: '2025-06-01 10:00:00' },
  // 李四 - 属于电商项目
  { id: 3, userId: 3, projectId: 1, isDefault: true, joinedAt: '2025-06-15 14:00:00', createdAt: '2025-06-15 14:00:00' },
  // 王五 - 属于CRM和OA两个项目
  { id: 4, userId: 4, projectId: 2, isDefault: true, joinedAt: '2025-07-01 09:00:00', createdAt: '2025-07-01 09:00:00' },
  { id: 5, userId: 4, projectId: 3, isDefault: false, joinedAt: '2025-07-01 09:00:00', createdAt: '2025-07-01 09:00:00' },
  // 赵六 - 属于OA项目（已禁用）
  { id: 6, userId: 5, projectId: 3, isDefault: true, joinedAt: '2025-08-01 10:00:00', createdAt: '2025-08-01 10:00:00' }
]

// ============================================================
// 7. 用户-项目-角色关联数据 (sys_user_project_role)
// ============================================================
export const mockUserProjectRoles = [
  // 张三 - 电商项目管理员
  { id: 1, userId: 2, projectId: 1, roleId: 1, createdAt: '2025-06-01 10:00:00' },
  // 张三 - CRM销售人员
  { id: 2, userId: 2, projectId: 2, roleId: 5, createdAt: '2025-06-01 10:00:00' },
  // 李四 - 电商客服人员
  { id: 3, userId: 3, projectId: 1, roleId: 3, createdAt: '2025-06-15 14:00:00' },
  // 王五 - CRM销售经理
  { id: 4, userId: 4, projectId: 2, roleId: 6, createdAt: '2025-07-01 09:00:00' },
  // 王五 - OA普通员工
  { id: 5, userId: 4, projectId: 3, roleId: 8, createdAt: '2025-07-01 09:00:00' },
  // 赵六 - OA HR人事
  { id: 6, userId: 5, projectId: 3, roleId: 9, createdAt: '2025-08-01 10:00:00' }
]

// ============================================================
// 8. 角色-权限关联数据 (sys_role_permission)
// ============================================================
export const mockRolePermissions = [
  // 电商项目管理员 - 拥有电商所有权限
  { id: 1, roleId: 1, permissionId: 10, createdAt: '2025-01-15 10:00:00' },
  { id: 2, roleId: 1, permissionId: 11, createdAt: '2025-01-15 10:00:00' },
  { id: 3, roleId: 1, permissionId: 12, createdAt: '2025-01-15 10:00:00' },
  { id: 4, roleId: 1, permissionId: 13, createdAt: '2025-01-15 10:00:00' },
  { id: 5, roleId: 1, permissionId: 14, createdAt: '2025-01-15 10:00:00' },
  { id: 6, roleId: 1, permissionId: 15, createdAt: '2025-01-15 10:00:00' },
  { id: 7, roleId: 1, permissionId: 16, createdAt: '2025-01-15 10:00:00' },
  // 电商运营人员 - 商品相关权限
  { id: 8, roleId: 2, permissionId: 10, createdAt: '2025-01-15 10:00:00' },
  { id: 9, roleId: 2, permissionId: 11, createdAt: '2025-01-15 10:00:00' },
  { id: 10, roleId: 2, permissionId: 12, createdAt: '2025-01-15 10:00:00' },
  // 电商客服人员 - 订单相关权限
  { id: 11, roleId: 3, permissionId: 14, createdAt: '2025-01-15 10:00:00' },
  { id: 12, roleId: 3, permissionId: 15, createdAt: '2025-01-15 10:00:00' },
  // CRM项目管理员 - 拥有CRM所有权限
  { id: 13, roleId: 4, permissionId: 20, createdAt: '2025-02-01 10:00:00' },
  { id: 14, roleId: 4, permissionId: 21, createdAt: '2025-02-01 10:00:00' },
  { id: 15, roleId: 4, permissionId: 22, createdAt: '2025-02-01 10:00:00' },
  { id: 16, roleId: 4, permissionId: 23, createdAt: '2025-02-01 10:00:00' },
  { id: 17, roleId: 4, permissionId: 24, createdAt: '2025-02-01 10:00:00' },
  { id: 18, roleId: 4, permissionId: 25, createdAt: '2025-02-01 10:00:00' },
  // CRM销售人员 - 客户和商机权限
  { id: 19, roleId: 5, permissionId: 20, createdAt: '2025-02-01 10:00:00' },
  { id: 20, roleId: 5, permissionId: 21, createdAt: '2025-02-01 10:00:00' },
  { id: 21, roleId: 5, permissionId: 22, createdAt: '2025-02-01 10:00:00' },
  { id: 22, roleId: 5, permissionId: 23, createdAt: '2025-02-01 10:00:00' },
  { id: 23, roleId: 5, permissionId: 24, createdAt: '2025-02-01 10:00:00' },
  // CRM销售经理 - 所有查看权限 + 报表
  { id: 24, roleId: 6, permissionId: 20, createdAt: '2025-02-01 10:00:00' },
  { id: 25, roleId: 6, permissionId: 23, createdAt: '2025-02-01 10:00:00' },
  { id: 26, roleId: 6, permissionId: 25, createdAt: '2025-02-01 10:00:00' },
  // OA项目管理员 - 拥有OA所有权限
  { id: 27, roleId: 7, permissionId: 30, createdAt: '2025-03-01 10:00:00' },
  { id: 28, roleId: 7, permissionId: 31, createdAt: '2025-03-01 10:00:00' },
  { id: 29, roleId: 7, permissionId: 32, createdAt: '2025-03-01 10:00:00' },
  { id: 30, roleId: 7, permissionId: 33, createdAt: '2025-03-01 10:00:00' },
  { id: 31, roleId: 7, permissionId: 34, createdAt: '2025-03-01 10:00:00' },
  { id: 32, roleId: 7, permissionId: 35, createdAt: '2025-03-01 10:00:00' },
  { id: 33, roleId: 7, permissionId: 36, createdAt: '2025-03-01 10:00:00' },
  // OA普通员工 - 基础权限
  { id: 34, roleId: 8, permissionId: 30, createdAt: '2025-03-01 10:00:00' },
  { id: 35, roleId: 8, permissionId: 31, createdAt: '2025-03-01 10:00:00' },
  { id: 36, roleId: 8, permissionId: 33, createdAt: '2025-03-01 10:00:00' },
  { id: 37, roleId: 8, permissionId: 35, createdAt: '2025-03-01 10:00:00' },
  // OA HR人事 - 审批处理 + 考勤管理
  { id: 38, roleId: 9, permissionId: 30, createdAt: '2025-03-01 10:00:00' },
  { id: 39, roleId: 9, permissionId: 31, createdAt: '2025-03-01 10:00:00' },
  { id: 40, roleId: 9, permissionId: 32, createdAt: '2025-03-01 10:00:00' },
  { id: 41, roleId: 9, permissionId: 33, createdAt: '2025-03-01 10:00:00' },
  { id: 42, roleId: 9, permissionId: 34, createdAt: '2025-03-01 10:00:00' },
  { id: 43, roleId: 9, permissionId: 35, createdAt: '2025-03-01 10:00:00' }
]

// ============================================================
// 9. 菜单-权限关联数据 (sys_menu_permission)
// ============================================================
export const mockMenuPermissions = [
  // 电商 - 商品列表关联商品查看权限
  { id: 1, menuId: 12, permissionId: 10, createdAt: '2025-01-15 10:00:00' },
  { id: 2, menuId: 12, permissionId: 11, createdAt: '2025-01-15 10:00:00' },
  { id: 3, menuId: 12, permissionId: 12, createdAt: '2025-01-15 10:00:00' },
  { id: 4, menuId: 12, permissionId: 13, createdAt: '2025-01-15 10:00:00' },
  // 电商 - 订单管理关联订单权限
  { id: 5, menuId: 14, permissionId: 14, createdAt: '2025-01-15 10:00:00' },
  { id: 6, menuId: 14, permissionId: 15, createdAt: '2025-01-15 10:00:00' },
  // CRM - 客户管理关联客户权限
  { id: 7, menuId: 21, permissionId: 20, createdAt: '2025-02-01 10:00:00' },
  { id: 8, menuId: 21, permissionId: 21, createdAt: '2025-02-01 10:00:00' },
  { id: 9, menuId: 21, permissionId: 22, createdAt: '2025-02-01 10:00:00' },
  // CRM - 商机管理关联商机权限
  { id: 10, menuId: 22, permissionId: 23, createdAt: '2025-02-01 10:00:00' },
  { id: 11, menuId: 22, permissionId: 24, createdAt: '2025-02-01 10:00:00' },
  // CRM - 销售报表关联报表权限
  { id: 12, menuId: 23, permissionId: 25, createdAt: '2025-02-01 10:00:00' },
  // OA - 审批中心关联审批权限
  { id: 13, menuId: 31, permissionId: 30, createdAt: '2025-03-01 10:00:00' },
  { id: 14, menuId: 31, permissionId: 31, createdAt: '2025-03-01 10:00:00' },
  { id: 15, menuId: 31, permissionId: 32, createdAt: '2025-03-01 10:00:00' },
  // OA - 考勤管理关联考勤权限
  { id: 16, menuId: 32, permissionId: 33, createdAt: '2025-03-01 10:00:00' },
  { id: 17, menuId: 32, permissionId: 34, createdAt: '2025-03-01 10:00:00' },
  // OA - 公告管理关联公告权限
  { id: 18, menuId: 33, permissionId: 35, createdAt: '2025-03-01 10:00:00' },
  { id: 19, menuId: 33, permissionId: 36, createdAt: '2025-03-01 10:00:00' }
]

// ============================================================
// 10. 用户标签数据 (sys_user_tag)
// ============================================================
export const mockUserTags = [
  { id: 1, projectId: 1, tagName: 'VIP客服', tagColor: '#f56c6c', description: '服务VIP客户', createdAt: '2025-01-15 10:00:00', updatedAt: '2025-01-15 10:00:00' },
  { id: 2, projectId: 1, tagName: '新人培训', tagColor: '#67c23a', description: '新入职员工', createdAt: '2025-01-15 10:00:00', updatedAt: '2025-01-15 10:00:00' },
  { id: 3, projectId: 2, tagName: '金牌销售', tagColor: '#e6a23c', description: '业绩优秀', createdAt: '2025-02-01 10:00:00', updatedAt: '2025-02-01 10:00:00' },
  { id: 4, projectId: 3, tagName: '管理层', tagColor: '#409eff', description: '中层管理人员', createdAt: '2025-03-01 10:00:00', updatedAt: '2025-03-01 10:00:00' }
]

// ============================================================
// 11. 用户-标签关联数据 (sys_user_tag_relation)
// ============================================================
export const mockUserTagRelations = [
  { id: 1, userId: 3, projectId: 1, tagId: 1, createdAt: '2025-06-15 14:00:00' },
  { id: 2, userId: 4, projectId: 2, tagId: 3, createdAt: '2025-07-01 09:00:00' }
]

// ============================================================
// 12. 当前项目菜单数据（用于侧边栏渲染）
// ============================================================

// 普通用户菜单（项目管理员）
export const mockProjectMenus = [
  {
    id: 100,
    groupTitle: '控制台',
    children: [
      {
        id: 101,
        menuCode: 'dashboard',
        menuName: '数据看板',
        icon: 'dashboard',
        path: '/dashboard',
        isVisible: true
      }
    ]
  },
  {
    id: 200,
    groupTitle: '日志',
    children: [
      {
        id: 201,
        menuCode: 'log_app',
        menuName: '日志',
        icon: 'receipt_long',
        path: '/log/app',
        isVisible: true
      },
      {
        id: 202,
        menuCode: 'log_server',
        menuName: '服务器信息日志',
        icon: 'dns',
        path: '/log/server',
        isVisible: true
      }
    ]
  },
  {
    id: 300,
    groupTitle: '项目设置',
    children: [
      {
        id: 301,
        menuCode: 'project_member',
        menuName: '成员管理',
        icon: 'people',
        path: '/project/member',
        isVisible: true
      },
      {
        id: 302,
        menuCode: 'project_role',
        menuName: '角色管理',
        icon: 'security',
        path: '/project/role',
        isVisible: true
      },
      {
        id: 303,
        menuCode: 'project_permission',
        menuName: '权限配置',
        icon: 'lock',
        path: '/project/permission',
        isVisible: true
      }
    ]
  }
]

// 超级管理员额外菜单
export const mockSuperAdminMenus = [
  {
    id: 400,
    groupTitle: '系统管理',
    children: [
      {
        id: 401,
        menuCode: 'system_user',
        menuName: '账号管理',
        icon: 'person',
        path: '/system/user',
        isVisible: true
      },
      {
        id: 402,
        menuCode: 'system_project',
        menuName: '项目管理',
        icon: 'folder',
        path: '/system/project',
        isVisible: true
      }
    ]
  }
]

// ============================================================
// 13. 登录响应模拟数据
// ============================================================
export const mockLoginResponse = {
  code: 200,
  message: '登录成功',
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yyyyy',
    expiresIn: 7200,
    user: {
      id: 2,
      username: 'zhangsan',
      nickname: '张三',
      avatar: '/avatars/zhangsan.png',
      isSuperAdmin: false
    },
    // 登录后返回用户可访问的项目列表
    projects: [
      { id: 1, projectCode: 'ecommerce', projectName: '电商管理系统', description: null, logo: null, status: 1, isDefault: true },
      { id: 2, projectCode: 'crm', projectName: 'CRM客户管理', description: null, logo: null, status: 1, isDefault: false }
    ],
    // 默认项目的权限信息
    currentProject: {
      id: 1,
      projectCode: 'ecommerce',
      projectName: '电商管理系统',
      roles: [
        { id: 1, roleCode: 'ecommerce_admin', roleName: '电商项目管理员', isProjectAdmin: true }
      ],
      permissions: [
        'ecommerce:product:view',
        'ecommerce:product:create',
        'ecommerce:product:edit',
        'ecommerce:product:delete',
        'ecommerce:order:view',
        'ecommerce:order:process',
        'ecommerce:member:manage'
      ],
      // 当前项目的菜单
      menus: mockProjectMenus
    }
  }
}

// ============================================================
// 14. 切换项目响应模拟数据
// ============================================================
export const mockSwitchProjectResponse = {
  code: 200,
  message: '切换项目成功',
  data: {
    currentProject: {
      id: 2,
      projectCode: 'crm',
      projectName: 'CRM客户管理',
      roles: [
        { id: 5, roleCode: 'crm_sales', roleName: '销售人员', isProjectAdmin: false }
      ],
      permissions: [
        'crm:customer:view',
        'crm:customer:create',
        'crm:customer:edit',
        'crm:opportunity:view',
        'crm:opportunity:manage'
      ],
      // 使用与当前项目相同的菜单格式
      menus: mockProjectMenus
    }
  }
}

// ============================================================
// 14. 获取用户权限响应模拟数据 (用于页面/按钮级权限判断)
// ============================================================
export const mockGetUserPermissionsResponse = {
  code: 200,
  message: '获取成功',
  data: {
    userId: 2,
    projectId: 1,
    permissions: [
      { code: 'ecommerce:product:view', name: '查看商品' },
      { code: 'ecommerce:product:create', name: '创建商品' },
      { code: 'ecommerce:product:edit', name: '编辑商品' },
      { code: 'ecommerce:product:delete', name: '删除商品' },
      { code: 'ecommerce:order:view', name: '查看订单' },
      { code: 'ecommerce:order:process', name: '处理订单' },
      { code: 'ecommerce:member:manage', name: '管理项目成员' }
    ]
  }
}

// ============================================================
// 15. 获取动态菜单响应模拟数据
// ============================================================
export const mockGetMenusResponse = {
  code: 200,
  message: '获取成功',
  data: [
    {
      id: 10,
      menuCode: 'ecommerce_dashboard',
      menuName: '工作台',
      menuType: 2,
      icon: 'Dashboard',
      path: '/ecommerce/dashboard',
      component: 'views/ecommerce/dashboard/index',
      children: []
    },
    {
      id: 11,
      menuCode: 'ecommerce_product',
      menuName: '商品管理',
      menuType: 1,
      icon: 'Goods',
      path: '/ecommerce/product',
      redirect: '/ecommerce/product/list',
      children: [
        {
          id: 12,
          menuCode: 'ecommerce_product_list',
          menuName: '商品列表',
          menuType: 2,
          path: '/ecommerce/product/list',
          component: 'views/ecommerce/product/list',
          children: []
        },
        {
          id: 13,
          menuCode: 'ecommerce_product_category',
          menuName: '商品分类',
          menuType: 2,
          path: '/ecommerce/product/category',
          component: 'views/ecommerce/product/category',
          children: []
        }
      ]
    },
    {
      id: 14,
      menuCode: 'ecommerce_order',
      menuName: '订单管理',
      menuType: 2,
      icon: 'Document',
      path: '/ecommerce/order',
      component: 'views/ecommerce/order/index',
      children: []
    }
  ]
}

// ============================================================
// 导出所有模拟数据
// ============================================================
export default {
  users: mockUsers,
  projects: mockProjects,
  roles: mockRoles,
  permissions: mockPermissions,
  menus: mockMenus,
  userProjects: mockUserProjects,
  userProjectRoles: mockUserProjectRoles,
  rolePermissions: mockRolePermissions,
  menuPermissions: mockMenuPermissions,
  userTags: mockUserTags,
  userTagRelations: mockUserTagRelations,
  // API 响应模拟
  loginResponse: mockLoginResponse,
  switchProjectResponse: mockSwitchProjectResponse,
  getUserPermissionsResponse: mockGetUserPermissionsResponse,
  getMenusResponse: mockGetMenusResponse
}
