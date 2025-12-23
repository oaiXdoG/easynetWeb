<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PATH_HOME } from '@/config/menus'
import '@/styles/views/error/error.css'

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">抱歉，您访问的页面不存在</p>
      <div class="error-actions">
        <button class="btn" @click="router.back()">返回上页</button>
        <button class="btn btn-primary" @click="router.push(PATH_HOME)">返回首页</button>
      </div>
    </div>
  </div>
</template>
