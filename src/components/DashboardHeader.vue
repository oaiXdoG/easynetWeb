<template>
  <el-header class="header">
    <div class="brand">日志管理系统</div>

    <div class="header-actions">
      <el-dropdown v-if="!isAdmin && apps.length" trigger="click" @command="handleAppSwitch">
        <el-button text>
          {{ currentApp?.name || '选择项目' }}
          <el-icon class="ml-4"><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="app in apps" :key="app.id" :command="app">
              {{ app.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="user-box">
        <el-avatar
          :size="28"
          :style="{ backgroundColor: isAdmin ? '#f56c6c' : '#409eff' }"
        >
          <el-icon><UserFilled /></el-icon>
        </el-avatar>
        <span class="user-name">
          {{ userInfo?.username }}
          <span v-if="isAdmin" class="admin-tag">(管理员)</span>
        </span>
      </div>

      <el-button text type="danger" @click="logout">
        <el-icon><SwitchButton /></el-icon>
        退出
      </el-button>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown, SwitchButton, UserFilled } from '@element-plus/icons-vue';
import type { AppConfig, UserInfo } from '@/types';
import { cache } from '@/utils/cacheManager';

const props = defineProps<{
  userInfo: UserInfo | null;
  apps: AppConfig[];
  currentApp: AppConfig | null;
  onAppSwitch?: (app: AppConfig) => void;
}>();

const router = useRouter();

const isAdmin = computed(() => props.userInfo?.username === 'admin');

const logout = () => {
  cache.clearAll();
  router.replace('/login');
};

const handleAppSwitch = (app: AppConfig) => {
  props.onAppSwitch?.(app);
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;
}
.brand {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.user-box {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}
.user-name .admin-tag {
  color: #f56c6c;
  margin-left: 4px;
}
.ml-4 {
  margin-left: 4px;
}
</style>
