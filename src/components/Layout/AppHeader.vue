<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProjectStore } from '@/stores'
import type { ProjectListItem } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const projectStore = useProjectStore()

// 深色模式 - 从 localStorage 读取
const isDark = ref(localStorage.getItem('theme') === 'dark')

// 初始化主题
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 项目下拉菜单显示状态
const showProjectDropdown = ref(false)
// 用户下拉菜单显示状态
const showUserDropdown = ref(false)

// 当前用户
const currentUser = computed(() => authStore.currentUser)
// 用户可访问的项目列表
const userProjects = computed(() => authStore.userProjects)
// 当前项目
const currentProject = computed(() => projectStore.currentProject)

// 截断文本（最多6个字符）
function truncate(text: string | undefined, maxLen = 6): string {
  if (!text) return ''
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
}

// 切换深色模式
function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 切换项目
async function handleSwitchProject(project: ProjectListItem) {
  if (project.id === currentProject.value?.id) {
    showProjectDropdown.value = false
    return
  }

  try {
    await projectStore.switchProject(project.id)
    showProjectDropdown.value = false
    router.push('/dashboard')
  } catch (error) {
    console.error('切换项目失败:', error)
  }
}

// 登出
async function handleLogout() {
  await authStore.logout()
  projectStore.clearCurrentProject()
  router.push('/login')
}

// 点击外部关闭下拉菜单
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.project-switcher')) {
    showProjectDropdown.value = false
  }
  if (!target.closest('.user-menu')) {
    showUserDropdown.value = false
  }
}
</script>

<template>
  <header class="app-header">
    <!-- 左侧 Logo -->
    <div class="header-left">
      <div class="logo" @click="router.push('/dashboard')">
        <span class="logo-text">EasyNet</span>
      </div>
    </div>

    <!-- 右侧：图标按钮 + 用户信息 + 项目切换 -->
    <div class="header-right">
      <!-- 深色模式切换 -->
      <button class="icon-btn" @click="toggleDarkMode" :title="isDark ? '浅色模式' : '深色模式'">
        <span class="material-icons">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
      </button>

      <!-- 用户信息 -->
      <div class="user-menu" @click.stop>
        <div class="user-info" @click="showUserDropdown = !showUserDropdown">
          <div class="avatar">
            <img v-if="currentUser?.avatar" :src="currentUser.avatar" alt="avatar" />
            <span v-else class="avatar-text">{{ currentUser?.nickname?.charAt(0) || 'U' }}</span>
          </div>
          <span class="username">{{ truncate(currentUser?.nickname || currentUser?.username) }}</span>
          <span class="arrow" :class="{ open: showUserDropdown }">▾</span>
        </div>

        <div class="user-dropdown" v-show="showUserDropdown">
          <div class="dropdown-item">
            <span class="material-icons">person</span>
            <span>个人设置</span>
          </div>
          <div class="dropdown-item">
            <span class="material-icons">vpn_key</span>
            <span>API令牌</span>
          </div>
          <div class="dropdown-item">
            <span class="material-icons">account_balance_wallet</span>
            <span>钱包</span>
          </div>
          <div class="dropdown-item logout" @click="handleLogout">
            <span class="material-icons">logout</span>
            <span>退出</span>
          </div>
        </div>
      </div>

      <!-- 项目切换器 -->
      <div class="project-switcher" v-if="userProjects.length > 0" @click.stop>
        <div
          class="current-project"
          @click="showProjectDropdown = !showProjectDropdown"
        >
          <span class="project-name">{{ truncate(currentProject?.projectName || '选择项目') }}</span>
          <span class="arrow" :class="{ open: showProjectDropdown }">▾</span>
        </div>

        <div class="project-dropdown" v-show="showProjectDropdown">
          <div
            class="project-item"
            v-for="project in userProjects"
            :key="project.id"
            :class="{ active: project.id === currentProject?.id }"
            @click="handleSwitchProject(project)"
          >
            <span class="project-item-name">{{ project.projectName }}</span>
            <span class="check" v-if="project.id === currentProject?.id">✓</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 56px;
  background: var(--bg-body);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  cursor: pointer;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 图标按钮 */
.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  color: var(--text-secondary);
}

.icon-btn:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

.icon-btn .material-icons {
  font-size: 20px;
}

/* 用户信息 */
.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: background 0.2s;
}

.user-info:hover {
  background: var(--hover-bg);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  background: #9c27b0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.username {
  font-size: 14px;
  color: var(--text-color);
}

.arrow {
  font-size: 12px;
  color: var(--text-muted);
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 140px;
  background: var(--bg-body);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 8px 0;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  color: var(--text-color);
}

.dropdown-item .material-icons {
  font-size: 18px;
  color: var(--text-color);
}

.dropdown-item:hover {
  background: var(--hover-bg);
}

.dropdown-item.logout {
  color: var(--text-color);
}

.dropdown-item.logout .material-icons {
  color: var(--text-color);
}

/* 项目切换器 */
.project-switcher {
  position: relative;
}

.current-project {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 6px;
}

.current-project:hover {
  background: var(--hover-bg);
}

.project-name {
  font-size: 14px;
  color: var(--text-color);
}

.project-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 160px;
  background: var(--bg-body);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 8px 0;
  z-index: 1000;
}

.project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--text-color);
}

.project-item:hover {
  background: var(--hover-bg);
}

.project-item.active {
  color: var(--text-color);
}

.project-item-name {
  font-size: 14px;
}

.check {
  color: var(--primary-color);
}
</style>
