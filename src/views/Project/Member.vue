<script setup lang="ts">
/**
 * 成员管理页面
 * API: api/project/index.ts
 */
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores'
import { mockUsers, mockUserProjects, mockUserProjectRoles, mockRoles } from '@/mock/data'
import '@/styles/views/project/member.css'
// import { projectApi } from '@/api'

const projectStore = useProjectStore()
const members = ref<any[]>([])
const searchKeyword = ref('')
const loading = ref(false)
const showAddModal = ref(false)
const showRoleModal = ref(false)
const selectedUser = ref<any>(null)
const selectedRoles = ref<number[]>([])

const projectRoles = computed(() => mockRoles.filter(r => r.projectId === projectStore.projectId))

const filteredMembers = computed(() => {
  return members.value.filter(m => !searchKeyword.value ||
    m.username.includes(searchKeyword.value) || m.nickname?.includes(searchKeyword.value))
})

async function loadMembers() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    const projectMembers = mockUserProjects.filter(up => up.projectId === projectStore.projectId)
    members.value = projectMembers.map(pm => {
      const user = mockUsers.find(u => u.id === pm.userId)
      const userRoles = mockUserProjectRoles
        .filter(upr => upr.userId === pm.userId && upr.projectId === projectStore.projectId)
        .map(upr => mockRoles.find(r => r.id === upr.roleId)).filter(Boolean)
      return { ...user, joinedAt: pm.joinedAt, roles: userRoles }
    })
  } finally { loading.value = false }
}

function handleAssignRole(member: any) {
  selectedUser.value = member
  selectedRoles.value = member.roles.map((r: any) => r.id)
  showRoleModal.value = true
}

async function handleSaveRoles() {
  // await projectApi.assignMemberRoles(projectStore.projectId, selectedUser.value.id, selectedRoles.value)
  showRoleModal.value = false
  await loadMembers()
}

async function handleRemoveMember(member: any) {
  if (!confirm(`确定要移除成员 "${member.nickname}" 吗？`)) return
  await loadMembers()
}

onMounted(() => loadMembers())
</script>

<template>
  <div class="page-container project-member-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">成员管理</h1>
        <p class="page-desc">管理项目 "{{ projectStore.projectName }}" 的成员</p>
      </div>
      <button class="btn btn-primary" @click="showAddModal = true">+ 添加成员</button>
    </div>

    <div class="filter-bar">
      <input v-model="searchKeyword" type="text" class="search-input" placeholder="搜索成员..." />
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr><th>成员</th><th>邮箱</th><th>角色</th><th>加入时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="5" class="loading-cell">加载中...</td></tr>
          <tr v-else-if="filteredMembers.length === 0"><td colspan="5" class="empty-cell">暂无成员</td></tr>
          <tr v-else v-for="member in filteredMembers" :key="member.id">
            <td>
              <div class="member-info">
                <div class="member-avatar">{{ member.nickname?.charAt(0) || 'U' }}</div>
                <div>
                  <div class="member-name">{{ member.nickname }}</div>
                  <div class="member-username">@{{ member.username }}</div>
                </div>
              </div>
            </td>
            <td>{{ member.email || '-' }}</td>
            <td>
              <div class="role-tags">
                <span class="role-tag" v-for="role in member.roles" :key="role.id" :class="{ admin: role.isProjectAdmin }">
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

    <!-- 角色分配模态框 -->
    <div class="modal-overlay" v-if="showRoleModal" @click.self="showRoleModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>分配角色</h2>
          <button class="modal-close" @click="showRoleModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p>为 {{ selectedUser?.nickname }} 分配角色</p>
          <div class="checkbox-group">
            <label v-for="role in projectRoles" :key="role.id" class="checkbox-item">
              <input type="checkbox" :value="role.id" v-model="selectedRoles" />
              <span>{{ role.roleName }}</span>
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
