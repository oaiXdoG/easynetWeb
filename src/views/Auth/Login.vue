<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/hooks'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

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
    const redirect = (route.query.redirect as string) || '/dashboard'
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
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  width: 400px;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 32px;
  font-weight: bold;
  color: #42b883;
  margin: 0;
}

.login-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.form-input {
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  background: var(--bg-card);
  color: var(--text-color);
  transition: border-color 0.3s, background 0.3s, color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #42b883;
}

.form-checkbox {
  flex-direction: row;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.error-message {
  padding: 10px;
  background: rgba(255, 77, 79, 0.1);
  border: 1px solid rgba(255, 77, 79, 0.4);
  border-radius: 4px;
  color: #ff4d4f;
  font-size: 14px;
}

.login-btn {
  height: 44px;
  background: #42b883;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: #33a06f;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.test-accounts {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.test-title {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0 0 12px;
}

.test-btns {
  display: flex;
  gap: 12px;
}

.test-btn {
  flex: 1;
  padding: 8px 12px;
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
}

.test-btn:hover {
  background: rgba(66, 184, 131, 0.15);
  border-color: #42b883;
  color: #42b883;
}
</style>
