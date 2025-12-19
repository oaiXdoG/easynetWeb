<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">403</h1>
      <p class="error-message">抱歉，您没有权限访问此页面</p>
      <div class="error-actions">
        <button class="btn" @click="router.back()">返回上页</button>
        <button class="btn btn-primary" @click="router.push('/dashboard')">返回首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; }
.error-content { text-align: center; }
.error-code { font-size: 120px; font-weight: bold; color: #e74c3c; margin: 0; line-height: 1; }
.error-message { font-size: 20px; color: #666; margin: 20px 0 40px; }
.error-actions { display: flex; gap: 16px; justify-content: center; }
.btn { padding: 10px 24px; font-size: 14px; border-radius: 4px; cursor: pointer; border: 1px solid #ddd; background: #fff; }
.btn:hover { border-color: #42b883; color: #42b883; }
.btn-primary { background: #42b883; border-color: #42b883; color: #fff; }
.btn-primary:hover { background: #33a06f; }
</style>
