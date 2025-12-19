<script setup lang="ts">
/**
 * 控制台页面
 * API: 无（使用 store 数据）
 */
import { computed } from 'vue'
import { useAuthStore, useProjectStore } from '@/stores'

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

<style scoped>
.dashboard-page {
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.page-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 8px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.info-card {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 16px;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.user-icon { background: #e3f2fd; }
.project-icon { background: #fff3e0; }
.role-icon { background: #fce4ec; }
.perm-icon { background: #f3e5f5; }

.card-content { flex: 1; }
.card-label { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
.card-value { font-size: 16px; font-weight: 600; color: var(--text-color); }
.card-extra { margin-top: 8px; }

.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  background: var(--hover-bg);
  color: var(--text-secondary);
}
.badge-primary { background: rgba(64, 158, 255, 0.15); color: #1976d2; }
.badge-success { background: rgba(56, 142, 60, 0.15); color: #38a169; }

.permissions-section, .quick-actions {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 16px;
}

.permissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.permission-tag {
  padding: 6px 12px;
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  font-family: monospace;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.action-card:hover {
  background: var(--hover-bg);
  border-color: var(--border-color);
}

.action-icon { font-size: 32px; }
.action-text { font-size: 14px; color: var(--text-color); }

@media (max-width: 1200px) {
  .info-cards, .action-cards { grid-template-columns: repeat(2, 1fr); }
}
</style>
