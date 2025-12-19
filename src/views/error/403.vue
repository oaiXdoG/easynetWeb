<script setup lang="ts">
import { useRouter } from 'vue-router'
import '@/styles/views/error/error.css'

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
