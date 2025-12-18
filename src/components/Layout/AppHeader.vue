<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProjectStore } from '@/stores'
import type { ProjectListItem } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const projectStore = useProjectStore()

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

// 切换项目
async function handleSwitchProject(project: ProjectListItem) {
  if (project.id === currentProject.value?.id) {
    showProjectDropdown.value = false
    return
  }

  try {
    await projectStore.switchProject(project.id)
    showProjectDropdown.value = false
    // 跳转到控制台
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
function closeDropdowns() {
  showProjectDropdown.value = false
  showUserDropdown.value = false
}
</script>

<template>
  <header class="app-header" @click="closeDropdowns">
    <div class="header-left">
      <div class="logo">
        <span class="logo-text">EasyNet</span>
      </div>

      <!-- 项目切换器 -->
      <div class="project-switcher" v-if="userProjects.length > 0" @click.stop>
        <div
          class="current-project"
          @click="showProjectDropdown = !showProjectDropdown"
        >
          <span class="project-name">{{ currentProject?.projectName || '选择项目' }}</span>
          <span class="arrow" :class="{ open: showProjectDropdown }">▼</span>
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

    <div class="header-right" @click.stop>
      <!-- 用户信息 -->
      <div class="user-info" @click="showUserDropdown = !showUserDropdown">
        <div class="avatar">
          <img v-if="currentUser?.avatar" :src="currentUser.avatar" alt="avatar" />
          <span v-else class="avatar-text">{{ currentUser?.nickname?.charAt(0) || 'U' }}</span>
        </div>
        <span class="username">{{ currentUser?.nickname || currentUser?.username }}</span>
        <span class="arrow" :class="{ open: showUserDropdown }">▼</span>
      </div>

      <div class="user-dropdown" v-show="showUserDropdown">
        <div class="dropdown-item" @click="router.push('/profile')">
          <span>个人中心</span>
        </div>
        <div class="dropdown-item" @click="router.push('/settings')">
          <span>设置</span>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item logout" @click="handleLogout">
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
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
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #42b883;
}

/* 项目切换器 */
.project-switcher {
  position: relative;
}

.current-project {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.current-project:hover {
  background: #e8e8e8;
}

.project-name {
  font-size: 14px;
  color: #333;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  font-size: 10px;
  color: #999;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

.project-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
}

.project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.project-item:hover {
  background: #f5f5f5;
}

.project-item.active {
  color: #42b883;
}

.project-item-name {
  font-size: 14px;
}

.check {
  color: #42b883;
}

/* 用户信息 */
.header-right {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.user-info:hover {
  background: #f5f5f5;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #42b883;
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
  font-size: 14px;
  font-weight: bold;
}

.username {
  font-size: 14px;
  color: #333;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 150px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
  color: #333;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.logout {
  color: #e74c3c;
}

.dropdown-divider {
  height: 1px;
  background: #e8e8e8;
  margin: 8px 0;
}
</style>
