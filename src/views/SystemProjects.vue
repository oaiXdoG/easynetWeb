<template>
  <div class="page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>项目管理</span>
          <el-tag type="info" effect="plain">占位页</el-tag>
        </div>
      </template>
      <p>这里可以对接后台接口，呈现项目列表、创建与编辑功能。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 占位实现，后续可接入真实数据
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
