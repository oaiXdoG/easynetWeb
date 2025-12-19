<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

interface MenuItem {
  icon: string
  label: string
  path: string
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 是否超级管理员
const isSuperAdmin = computed(() => authStore.isSuperAdmin)

// 菜单分组
const menuGroups = computed<MenuGroup[]>(() => {
  const groups: MenuGroup[] = []

  // 控制台分组
  groups.push({
    title: '控制台',
    items: [
      { icon: 'dashboard', label: '数据看板', path: '/dashboard' }
    ]
  })

  // 项目设置分组
  groups.push({
    title: '项目设置',
    items: [
      { icon: 'people', label: '成员管理', path: '/project/member' },
      { icon: 'security', label: '角色管理', path: '/project/role' },
      { icon: 'lock', label: '权限配置', path: '/project/permission' }
    ]
  })

  // 系统管理（超管专用）
  if (isSuperAdmin.value) {
    groups.push({
      title: '系统管理',
      items: [
        { icon: 'person', label: '账号管理', path: '/system/user' },
        { icon: 'folder', label: '项目管理', path: '/system/project' }
      ]
    })
  }

  return groups
})

// 检查是否激活
function isActive(path: string) {
  return route.path === path
}

// 导航
function handleNavigate(path: string) {
  router.push(path)
}
</script>

<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <div v-for="group in menuGroups" :key="group.title" class="nav-group">
        <div class="group-title">{{ group.title }}</div>
        <div
          v-for="item in group.items"
          :key="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
          @click="handleNavigate(item.path)"
        >
          <span class="nav-icon material-icons">{{ item.icon }}</span>
          <span class="nav-text">{{ item.label }}</span>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 200px;
  height: calc(100vh - 56px);
  background: var(--bg-body);
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: 56px;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 导航 */
.sidebar-nav {
  padding: 16px 0;
}

.nav-group {
  margin-bottom: 8px;
}

.group-title {
  padding: 8px 20px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  margin: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-color);
  font-size: 14px;
}

.nav-item:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
}

.nav-item.active {
  color: var(--primary-color);
  background: var(--active-bg);
}

.nav-icon {
  font-size: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
}
</style>
