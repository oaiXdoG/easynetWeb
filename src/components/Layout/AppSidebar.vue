<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore, useAuthStore } from '@/stores'
import type { MenuTreeNode } from '@/types'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const authStore = useAuthStore()

// 菜单列表
const menus = computed(() => menuStore.visibleMenus)

// 是否超级管理员
const isSuperAdmin = computed(() => authStore.isSuperAdmin)

// 平台管理菜单（超管专用）
const platformMenus: MenuTreeNode[] = [
  {
    id: -1,
    parentId: 0,
    menuCode: 'platform_system',
    menuName: '系统管理',
    menuType: 1,
    icon: '⚙️',
    path: '/system',
    component: null,
    redirect: '/system/user',
    isVisible: true,
    isCache: false,
    isExternal: false,
    sortOrder: 100,
    children: [
      {
        id: -2,
        parentId: -1,
        menuCode: 'platform_user',
        menuName: '账号管理',
        menuType: 2,
        icon: null,
        path: '/system/user',
        component: 'views/system/user/index',
        redirect: null,
        isVisible: true,
        isCache: false,
        isExternal: false,
        sortOrder: 1
      },
      {
        id: -3,
        parentId: -1,
        menuCode: 'platform_project',
        menuName: '项目管理',
        menuType: 2,
        icon: null,
        path: '/system/project',
        component: 'views/system/project/index',
        redirect: null,
        isVisible: true,
        isCache: false,
        isExternal: false,
        sortOrder: 2
      }
    ]
  }
]

// 合并菜单
const allMenus = computed(() => {
  const list = [...menus.value]
  if (isSuperAdmin.value) {
    list.push(...platformMenus)
  }
  return list
})

// 检查是否激活
function isActive(menu: MenuTreeNode): boolean {
  if (menu.path === route.path) return true
  if (menu.children?.some(child => child.path === route.path)) return true
  return false
}

// 导航
function handleNavigate(menu: MenuTreeNode) {
  if (menu.path) {
    router.push(menu.redirect || menu.path)
  }
}
</script>

<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <!-- 控制台 -->
      <div
        class="nav-item"
        :class="{ active: route.path === '/dashboard' }"
        @click="router.push('/dashboard')"
      >
        <span class="nav-icon">📊</span>
        <span class="nav-text">控制台</span>
      </div>

      <!-- 动态菜单 -->
      <template v-for="menu in allMenus" :key="menu.id">
        <!-- 有子菜单 -->
        <div v-if="menu.children && menu.children.length > 0" class="nav-group">
          <div
            class="nav-item nav-parent"
            :class="{ active: isActive(menu) }"
          >
            <span class="nav-icon">{{ menu.icon || '📁' }}</span>
            <span class="nav-text">{{ menu.menuName }}</span>
          </div>
          <div class="nav-children">
            <div
              v-for="child in menu.children"
              :key="child.id"
              class="nav-item nav-child"
              :class="{ active: route.path === child.path }"
              @click="handleNavigate(child)"
            >
              <span class="nav-text">{{ child.menuName }}</span>
            </div>
          </div>
        </div>

        <!-- 无子菜单 -->
        <div
          v-else
          class="nav-item"
          :class="{ active: route.path === menu.path }"
          @click="handleNavigate(menu)"
        >
          <span class="nav-icon">{{ menu.icon || '📄' }}</span>
          <span class="nav-text">{{ menu.menuName }}</span>
        </div>
      </template>

      <!-- 项目设置（项目管理员可见） -->
      <div class="nav-group">
        <div
          class="nav-item nav-parent"
          :class="{ active: route.path.startsWith('/project-settings') }"
        >
          <span class="nav-icon">⚙️</span>
          <span class="nav-text">项目设置</span>
        </div>
        <div class="nav-children">
          <div
            class="nav-item nav-child"
            :class="{ active: route.path === '/project-settings/member' }"
            @click="router.push('/project-settings/member')"
          >
            <span class="nav-text">成员管理</span>
          </div>
          <div
            class="nav-item nav-child"
            :class="{ active: route.path === '/project-settings/role' }"
            @click="router.push('/project-settings/role')"
          >
            <span class="nav-text">角色管理</span>
          </div>
          <div
            class="nav-item nav-child"
            :class="{ active: route.path === '/project-settings/permission' }"
            @click="router.push('/project-settings/permission')"
          >
            <span class="nav-text">权限配置</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 220px;
  height: calc(100vh - 60px);
  background: #fff;
  border-right: 1px solid #e8e8e8;
  position: fixed;
  top: 60px;
  left: 0;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 16px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s;
  color: #333;
  font-size: 14px;
}

.nav-item:hover {
  background: #f5f5f5;
}

.nav-item.active {
  color: #42b883;
  background: #e8f5e9;
  border-right: 3px solid #42b883;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-text {
  flex: 1;
}

.nav-group {
  margin-bottom: 8px;
}

.nav-parent {
  font-weight: 500;
}

.nav-children {
  padding-left: 20px;
}

.nav-child {
  padding-left: 30px;
  font-size: 13px;
}

.nav-child .nav-text {
  position: relative;
  padding-left: 16px;
}

.nav-child .nav-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
  transform: translateY(-50%);
}

.nav-child.active .nav-text::before {
  background: #42b883;
}
</style>
