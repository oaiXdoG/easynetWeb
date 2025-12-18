<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores'
import { mockUsers, mockUserProjects, mockUserProjectRoles, mockRoles } from '@/mock/data'

const projectStore = useProjectStore()

// 成员列表
const members = ref<any[]>([])
// 搜索关键词
const searchKeyword = ref('')
// 加载状态
const loading = ref(false)

// 模态框状态
const showAddModal = ref(false)
const showRoleModal = ref(false)
const selectedUser = ref<any>(null)
const selectedRoles = ref<number[]>([])

// 当前项目的角色列表
const projectRoles = computed(() => {
  return mockRoles.filter(r => r.projectId === projectStore.projectId)
})

// 筛选后的成员列表
const filteredMembers = computed(() => {
  return members.value.filter(member => {
    return !searchKeyword.value ||
      member.username.includes(searchKeyword.value) ||
      member.nickname?.includes(searchKeyword.value)
  })
})

// 加载成员列表
async function loadMembers() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))

    // 获取当前项目的成员
    const projectMembers = mockUserProjects.filter(
      up => up.projectId === projectStore.projectId
    )

    members.value = projectMembers.map(pm => {
      const user = mockUsers.find(u => u.id === pm.userId)
      const userRoles = mockUserProjectRoles
        .filter(upr => upr.userId === pm.userId && upr.projectId === projectStore.projectId)
        .map(upr => {
          const role = mockRoles.find(r => r.id === upr.roleId)
          return role
        })
        .filter(Boolean)

      return {
        ...user,
        joinedAt: pm.joinedAt,
        roles: userRoles
      }
    })
  } finally {
    loading.value = false
  }
}

// 打开添加成员模态框
function handleAddMember() {
  showAddModal.value = true
}

// 打开角色分配模态框
function handleAssignRole(member: any) {
  selectedUser.value = member
  selectedRoles.value = member.roles.map((r: any) => r.id)
  showRoleModal.value = true
}

// 保存角色分配
async function handleSaveRoles() {
  console.log('保存角色:', selectedUser.value?.id, selectedRoles.value)
  showRoleModal.value = false
  await loadMembers()
}

// 移除成员
async function handleRemoveMember(member: any) {
  if (!confirm(`确定要移除成员 "${member.nickname}" 吗？`)) return
  console.log('移除成员:', member.id)
  await loadMembers()
}

onMounted(() => {
  loadMembers()
})
</script>

<template>
  <div class="member-manage-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">成员管理</h1>
        <p class="page-desc">管理项目 "{{ projectStore.projectName }}" 的成员</p>
      </div>
      <button class="btn btn-primary" @click="handleAddMember">
        + 添加成员
      </button>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="搜索成员..."
      />
    </div>

    <!-- 成员列表 -->
    <div class="member-table-wrapper">
      <table class="member-table">
        <thead>
          <tr>
            <th>成员</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>加入时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5" class="loading-cell">加载中...</td>
          </tr>
          <tr v-else-if="filteredMembers.length === 0">
            <td colspan="5" class="empty-cell">暂无成员</td>
          </tr>
          <tr v-else v-for="member in filteredMembers" :key="member.id">
            <td>
              <div class="member-info">
                <div class="member-avatar">
                  {{ member.nickname?.charAt(0) || 'U' }}
                </div>
                <div>
                  <div class="member-name">{{ member.nickname }}</div>
                  <div class="member-username">@{{ member.username }}</div>
                </div>
              </div>
            </td>
            <td>{{ member.email || '-' }}</td>
            <td>
              <div class="role-tags">
                <span
                  class="role-tag"
                  v-for="role in member.roles"
                  :key="role.id"
                  :class="{ admin: role.isProjectAdmin }"
                >
                  {{ role.roleName }}
                </span>
                <span v-if="member.roles.length === 0" class="no-role">未分配角色</span>
              </div>
            </td>
            <td>{{ member.joinedAt }}</td>
            <td class="actions-cell">
              <button class="btn-link" @click="handleAssignRole(member)">分配角色</button>
              <button class="btn-link danger" @click="handleRemoveMember(member)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加成员模态框 -->
    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>添加成员</h2>
          <button class="modal-close" @click="showAddModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label class="form-label">选择用户</label>
            <select class="form-input">
              <option value="">请选择用户</option>
              <option v-for="user in mockUsers" :key="user.id" :value="user.id">
                {{ user.nickname }} (@{{ user.username }})
              </option>
            </select>
          </div>
          <div class="form-item">
            <label class="form-label">分配角色</label>
            <div class="checkbox-group">
              <label v-for="role in projectRoles" :key="role.id" class="checkbox-item">
                <input type="checkbox" :value="role.id" />
                <span>{{ role.roleName }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="showAddModal = false">取消</button>
          <button class="btn btn-primary">添加</button>
        </div>
      </div>
    </div>

    <!-- 角色分配模态框 -->
    <div class="modal-overlay" v-if="showRoleModal" @click.self="showRoleModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>分配角色</h2>
          <button class="modal-close" @click="showRoleModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p class="modal-desc">为 {{ selectedUser?.nickname }} 分配角色</p>
          <div class="checkbox-group">
            <label v-for="role in projectRoles" :key="role.id" class="checkbox-item">
              <input type="checkbox" :value="role.id" v-model="selectedRoles" />
              <span>{{ role.roleName }}</span>
              <span class="role-desc" v-if="role.description">{{ role.description }}</span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="showRoleModal = false">取消</button>
          <button class="btn btn-primary" @click="handleSaveRoles">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-manage-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.page-desc {
  font-size: 14px;
  color: #999;
  margin-top: 4px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: #fff;
}

.btn-primary {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}

.filter-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.member-table-wrapper {
  overflow-x: auto;
}

.member-table {
  width: 100%;
  border-collapse: collapse;
}

.member-table th,
.member-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.member-table th {
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

.member-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #42b883;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.member-name {
  font-weight: 500;
}

.member-username {
  font-size: 12px;
  color: #999;
}

.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.role-tag {
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.role-tag.admin {
  background: #e8f5e9;
  color: #388e3c;
}

.no-role {
  font-size: 12px;
  color: #999;
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

.btn-link.danger {
  color: #e74c3c;
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
}

.modal-desc {
  margin: 0 0 16px;
  color: #666;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-item input {
  width: 16px;
  height: 16px;
}

.role-desc {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}
</style>
