<template>
  <div class="login-wrapper">
    <el-card class="login-card" shadow="hover">
      <div class="header">
        <h2>用户登录</h2>
        <p>欢迎使用数据分析平台</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        size="large"
        @keyup.enter="handleSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <div class="form-footer">
            <el-checkbox v-model="form.remember">记住密码</el-checkbox>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            :loading="loading"
            @click="handleSubmit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { login } from '@/api';
import { cache } from '@/utils/cacheManager';

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const router = useRouter();
const route = useRoute();
const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false
});

const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '用户名至少2个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码至少4个字符', trigger: 'blur' }
  ]
});

onMounted(() => {
  const userInfo = cache.getUserInfo();
  form.username = userInfo?.username || '';
  form.password = userInfo?.password || '';
  form.remember = Boolean(userInfo?.password);
});

const handleSubmit = async () => {
  if (!formRef.value) return;
  const valid = await formRef.value.validate();
  if (!valid) return;

  try {
    loading.value = true;
    const result = await login(form.username, form.password);
    if (result.code !== 1) {
      ElMessage.error(result.message || '登录失败');
      return;
    }

    cache.setUserInfo(
      form.username,
      result.data?.token,
      form.remember ? form.password : undefined
    );
    cache.setLoginFlag();
    ElMessage.success('登录成功');

    const redirect =
      (route.query.redirect as string) || (form.username === 'admin' ? '/system' : '/');
    router.replace(redirect);
  } catch (error) {
    console.error('login error:', error);
    ElMessage.error('服务暂时不可用，请稍后重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px;
}
.login-card {
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}
.header {
  text-align: center;
  margin-bottom: 16px;
}
.header h2 {
  margin: 0 0 6px;
  color: #1f1f1f;
  font-weight: 700;
}
.header p {
  margin: 0;
  color: #909399;
}
.form-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.submit-btn {
  width: 100%;
}
</style>
