<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/hooks'
import { PATH_HOME } from '@/config/menus'
import '@/styles/views/auth/login.css'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()
const isDark = ref(localStorage.getItem('theme') === 'dark')

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  remember: false
})

// 加载状态
const loading = ref(false)
// 错误消息
const errorMsg = ref('')

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggleDarkMode() {
  isDark.value = !isDark.value
  applyTheme()
}

// 初始化主题
applyTheme()

// 提交登录
async function handleSubmit() {
  if (!formData.username || !formData.password) {
    errorMsg.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await login(formData)

    // 获取重定向地址
    const redirect = (route.query.redirect as string) || PATH_HOME
    router.push(redirect)
  } catch (error: any) {
    errorMsg.value = error.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}

// 填充测试账号
function fillTestAccount(type: 'admin' | 'user') {
  if (type === 'admin') {
    formData.username = 'superadmin'
    formData.password = 'admin123'
  } else {
    formData.username = 'zhangsan'
    formData.password = '123456'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-top">
        <button class="login-toggle-btn" type="button" @click="toggleDarkMode" :title="isDark ? '切换浅色' : '切换深色'">
          <span class="material-icons">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
        </button>
      </div>
      <div class="login-header">
        <h1 class="login-title">EasyNet</h1>
        <p class="login-subtitle">多应用管理平台</p>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-item">
          <label class="form-label">用户名</label>
          <input
            v-model="formData.username"
            type="text"
            class="form-input"
            placeholder="请输入用户名"
            autocomplete="username"
          />
        </div>

        <div class="form-item">
          <label class="form-label">密码</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-input"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>

        <div class="form-item form-checkbox">
          <label class="checkbox-label">
            <input v-model="formData.remember" type="checkbox" />
            <span>记住我</span>
          </label>
        </div>

        <div v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </div>

        <button
          type="submit"
          class="login-btn"
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 测试账号提示 -->
      <div class="test-accounts">
        <p class="test-title">测试账号：</p>
        <div class="test-btns">
          <button class="test-btn" @click="fillTestAccount('admin')">
            超级管理员
          </button>
          <button class="test-btn" @click="fillTestAccount('user')">
            普通用户
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* styles moved to src/styles/views/auth/login.css */
</style>
