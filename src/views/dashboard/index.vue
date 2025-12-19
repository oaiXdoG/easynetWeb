<script setup lang="ts">
/**
 * 控制台页面
 * API: 无（使用 store 数据）
 */
import { computed } from 'vue'
import { useAuthStore, useProjectStore } from '@/stores'
import '@/styles/views/dashboard.css'

const authStore = useAuthStore()
const projectStore = useProjectStore()

const currentUser = computed(() => authStore.currentUser)
const currentProject = computed(() => projectStore.currentProject)
const isSuperAdmin = computed(() => authStore.isSuperAdmin)
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header">
      <h1 class="page-title">控制台</h1>
      <p class="page-desc">欢迎回来，{{ currentUser?.nickname || currentUser?.username }}</p>
    </div>

    <!-- 用户信息卡片 -->
    <div class="info-cards">
      <div class="info-card">
        <div class="card-icon user-icon">👤</div>
        <div class="card-content">
          <div class="card-label">当前用户</div>
          <div class="card-value">{{ currentUser?.nickname }}</div>
          <div class="card-extra" v-if="isSuperAdmin">
            <span class="badge badge-primary">超级管理员</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-icon project-icon">📁</div>
        <div class="card-content">
          <div class="card-label">当前项目</div>
          <div class="card-value">{{ currentProject?.projectName || '未选择' }}</div>
          <div class="card-extra" v-if="currentProject">
            <span class="badge badge-success" v-if="projectStore.isProjectAdmin">项目管理员</span>
            <span class="badge" v-else>普通成员</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-icon role-icon">🎭</div>
        <div class="card-content">
          <div class="card-label">当前角色</div>
          <div class="card-value">
            {{ currentProject?.roles.map(r => r.roleName).join(', ') || '无' }}
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-icon perm-icon">🔐</div>
        <div class="card-content">
          <div class="card-label">权限数量</div>
          <div class="card-value">{{ currentProject?.permissions.length || 0 }} 个</div>
        </div>
      </div>
    </div>

    <!-- 权限列表 -->
    <div class="permissions-section" v-if="currentProject?.permissions.length">
      <h2 class="section-title">当前权限</h2>
      <div class="permissions-list">
        <span
          class="permission-tag"
          v-for="perm in currentProject.permissions"
          :key="perm"
        >
          {{ perm }}
        </span>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <h2 class="section-title">快捷操作</h2>
      <div class="action-cards">
        <router-link to="/project/member" class="action-card">
          <span class="action-icon">👥</span>
          <span class="action-text">成员管理</span>
        </router-link>
        <router-link to="/project/role" class="action-card">
          <span class="action-icon">🎭</span>
          <span class="action-text">角色管理</span>
        </router-link>
        <router-link to="/project/permission" class="action-card">
          <span class="action-icon">🔐</span>
          <span class="action-text">权限配置</span>
        </router-link>
        <router-link v-if="isSuperAdmin" to="/system/user" class="action-card">
          <span class="action-icon">⚙️</span>
          <span class="action-text">系统管理</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
