<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProjectStore } from '@/stores'
import type { ProjectListItem } from '@/types'
import '@/styles/layout/header.css'

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

function toggleUserMenu() {
  showUserDropdown.value = !showUserDropdown.value
}

function toggleProjectMenu() {
  showProjectDropdown.value = !showProjectDropdown.value
}

// 互斥与外部点击收起
watch(showUserDropdown, (val) => {
  if (val) showProjectDropdown.value = false
})

watch(showProjectDropdown, (val) => {
  if (val) showUserDropdown.value = false
})
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
        <div class="user-info" @click="toggleUserMenu">
          <div class="avatar">
            <img v-if="currentUser?.avatar" :src="currentUser.avatar" alt="avatar" />
            <span v-else class="avatar-text">{{ currentUser?.nickname?.charAt(0) || 'U' }}</span>
          </div>
          <span class="username">{{ truncate(currentUser?.nickname || currentUser?.username) }}</span>
          <span class="arrow" :class="{ open: showUserDropdown }">▾</span>
        </div>

        <div class="user-dropdown" v-show="showUserDropdown" @mouseleave="showUserDropdown = false">
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
          @click="toggleProjectMenu"
        >
          <span class="project-name">{{ truncate(currentProject?.projectName || '选择项目') }}</span>
          <span class="arrow" :class="{ open: showProjectDropdown }">▾</span>
        </div>

        <div class="project-dropdown" v-show="showProjectDropdown" @mouseleave="showProjectDropdown = false">
          <div
            class="project-item"
            v-for="project in userProjects"
            :key="project.id"
            :class="{ active: project.id === currentProject?.id }"
            @click="handleSwitchProject(project)"
          >
            <span class="check" :class="{ visible: project.id === currentProject?.id }">✓</span>
            <span class="project-item-name">{{ project.projectName }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
