<template>
  <div class="redirect">
    <el-icon class="spinner"><Loading /></el-icon>
    <div class="text">正在跳转...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Loading } from '@element-plus/icons-vue';
import { cache } from '@/utils/cacheManager';

const router = useRouter();

onMounted(() => {
  const userInfo = cache.getUserInfo();
  if (!userInfo) {
    router.replace('/login');
    return;
  }

  // 目前 admin 与普通用户都跳转 system，后续可按菜单调整
  if (userInfo.username === 'admin') {
    router.replace('/system');
  } else {
    router.replace('/system');
  }
});
</script>

<style scoped>
.redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 360px;
  background: #f5f7fa;
  color: #606266;
  gap: 12px;
}
.spinner {
  font-size: 32px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
