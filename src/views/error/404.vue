<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">抱歉，您访问的页面不存在</p>
      <div class="error-actions">
        <button class="btn btn-outline" @click="goBack">返回上页</button>
        <button class="btn btn-primary" @click="goHome">返回首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #ccc;
  margin: 0;
  line-height: 1;
}

.error-message {
  font-size: 20px;
  color: #666;
  margin: 20px 0 40px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn {
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ddd;
  color: #666;
}

.btn-outline:hover {
  border-color: #42b883;
  color: #42b883;
}

.btn-primary {
  background: #42b883;
  border: 1px solid #42b883;
  color: white;
}

.btn-primary:hover {
  background: #33a06f;
}
</style>
