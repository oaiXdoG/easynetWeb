<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { mockUsers } from '@/mock/data'
import type { UserListItem } from '@/types'

// 用户列表
const users = ref<UserListItem[]>([])
// 搜索关键词
const searchKeyword = ref('')
// 状态筛选
const statusFilter = ref<number | ''>('')
// 加载状态
const loading = ref(false)

// 模态框状态
const showModal = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const currentUser = ref<Partial<UserListItem>>({})

// 筛选后的用户列表
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchKeyword = !searchKeyword.value ||
      user.username.includes(searchKeyword.value) ||
      user.nickname?.includes(searchKeyword.value) ||
      user.email?.includes(searchKeyword.value)

    const matchStatus = statusFilter.value === '' ||
      user.status === statusFilter.value

    return matchKeyword && matchStatus
  })
})

// 加载用户列表
async function loadUsers() {
  loading.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 300))
    users.value = mockUsers.map(u => ({
      id: u.id,
      username: u.username,
      nickname: u.nickname,
      email: u.email,
      phone: u.phone,
      avatar: u.avatar,
      isSuperAdmin: u.isSuperAdmin,
      status: u.status,
      createdAt: u.createdAt
    }))
  } finally {
    loading.value = false
  }
}

// 打开创建模态框
function handleCreate() {
  modalType.value = 'create'
  currentUser.value = {
    username: '',
    nickname: '',
    email: '',
    phone: '',
    status: 1
  }
  showModal.value = true
}

// 打开编辑模态框
function handleEdit(user: UserListItem) {
  modalType.value = 'edit'
  currentUser.value = { ...user }
  showModal.value = true
}

// 保存用户
async function handleSave() {
  // TODO: 调用 API 保存
  console.log('保存用户:', currentUser.value)
  showModal.value = false
  await loadUsers()
}

// 切换状态
async function handleToggleStatus(user: UserListItem) {
  // TODO: 调用 API 更新状态
  user.status = user.status === 1 ? 0 : 1
}

// 删除用户
async function handleDelete(user: UserListItem) {
  if (!confirm(`确定要删除用户 "${user.nickname}" 吗？`)) return
  // TODO: 调用 API 删除
  console.log('删除用户:', user.id)
  await loadUsers()
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="user-manage-page">
    <div class="page-header">
      <h1 class="page-title">账号管理</h1>
      <button class="btn btn-primary" @click="handleCreate">
        + 创建账号
      </button>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="搜索用户名、昵称、邮箱..."
      />
      <select v-model="statusFilter" class="status-select">
        <option value="">全部状态</option>
        <option :value="1">启用</option>
        <option :value="0">禁用</option>
      </select>
    </div>

    <!-- 用户列表 -->
    <div class="user-table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>昵称</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>类型</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="loading-cell">加载中...</td>
          </tr>
          <tr v-else-if="filteredUsers.length === 0">
            <td colspan="8" class="empty-cell">暂无数据</td>
          </tr>
          <tr v-else v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.nickname || '-' }}</td>
            <td>{{ user.email || '-' }}</td>
            <td>{{ user.phone || '-' }}</td>
            <td>
              <span class="badge badge-primary" v-if="user.isSuperAdmin">超级管理员</span>
              <span class="badge" v-else>普通用户</span>
            </td>
            <td>
              <span class="status-tag" :class="user.status === 1 ? 'active' : 'inactive'">
                {{ user.status === 1 ? '启用' : '禁用' }}
              </span>
            </td>
            <td>{{ user.createdAt }}</td>
            <td class="actions-cell">
              <button class="btn-link" @click="handleEdit(user)">编辑</button>
              <button
                class="btn-link"
                :class="user.status === 1 ? 'warning' : 'success'"
                @click="handleToggleStatus(user)"
                :disabled="user.isSuperAdmin"
              >
                {{ user.status === 1 ? '禁用' : '启用' }}
              </button>
              <button
                class="btn-link danger"
                @click="handleDelete(user)"
                :disabled="user.isSuperAdmin"
              >
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 创建/编辑模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ modalType === 'create' ? '创建账号' : '编辑账号' }}</h2>
          <button class="modal-close" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label class="form-label">用户名</label>
            <input
              v-model="currentUser.username"
              type="text"
              class="form-input"
              :disabled="modalType === 'edit'"
            />
          </div>
          <div class="form-item" v-if="modalType === 'create'">
            <label class="form-label">密码</label>
            <input
              v-model="(currentUser as any).password"
              type="password"
              class="form-input"
            />
          </div>
          <div class="form-item">
            <label class="form-label">昵称</label>
            <input v-model="currentUser.nickname" type="text" class="form-input" />
          </div>
          <div class="form-item">
            <label class="form-label">邮箱</label>
            <input v-model="currentUser.email" type="email" class="form-input" />
          </div>
          <div class="form-item">
            <label class="form-label">手机号</label>
            <input v-model="currentUser.phone" type="tel" class="form-input" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="handleSave">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-manage-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: #fff;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}

.btn-primary:hover {
  background: #33a06f;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  max-width: 300px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.status-select {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
}

/* 表格 */
.user-table-wrapper {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.user-table th {
  background: #fafafa;
  color: #666;
  font-weight: 500;
}

.loading-cell,
.empty-cell {
  text-align: center;
  color: #999;
  padding: 40px !important;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  background: #f5f5f5;
  color: #666;
}

.badge-primary {
  background: #e3f2fd;
  color: #1976d2;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.active {
  background: #e8f5e9;
  color: #388e3c;
}

.status-tag.inactive {
  background: #ffebee;
  color: #c62828;
}

.actions-cell {
  white-space: nowrap;
}

.btn-link {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
}

.btn-link:hover {
  text-decoration: underline;
}

.btn-link.warning {
  color: #f39c12;
}

.btn-link.success {
  color: #27ae60;
}

.btn-link.danger {
  color: #e74c3c;
}

.btn-link:disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  color: #333;
}

.form-input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:disabled {
  background: #f5f5f5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}
</style>
