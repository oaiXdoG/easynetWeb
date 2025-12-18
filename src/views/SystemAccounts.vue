<template>
  <div class="page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>账户管理</span>
          <el-tag type="info" effect="plain">占位页</el-tag>
        </div>
      </template>
      <p>在这里展示用户账号、角色与权限的管理界面。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 占位实现
</script>

<style scoped>
.page {
  padding: 16px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
p {
  margin: 0;
  color: #606266;
}
</style>
