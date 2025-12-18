<template>
  <div class="empty-wrapper">
    <el-empty :description="description">
      <template #image>
        <el-icon class="empty-icon"><Files /></el-icon>
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { Files } from '@element-plus/icons-vue';

defineProps<{
  description?: string;
}>();
</script>

<style scoped>
.empty-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 320px;
  background: #f5f7fa;
}
.empty-icon {
  font-size: 48px;
  color: #c0c4cc;
}
</style>
