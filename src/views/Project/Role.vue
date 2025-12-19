<script setup lang="ts">
/**
 * 角色管理页面
 * API: api/project/index.ts
 */
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores'
import { mockRoles, mockRolePermissions, mockPermissions } from '@/mock/data'
import '@/styles/views/project/role.css'
// import { projectApi } from '@/api'

const projectStore = useProjectStore()
const roles = ref<any[]>([])
const loading = ref(false)
const showModal = ref(false)
const showPermModal = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const currentRole = ref<any>({})
const selectedPermissions = ref<number[]>([])

const projectPermissions = computed(() => mockPermissions.filter(p => p.projectId === projectStore.projectId))

async function loadRoles() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    roles.value = mockRoles.filter(r => r.projectId === projectStore.projectId).map(role => ({
      ...role, permissionCount: mockRolePermissions.filter(rp => rp.roleId === role.id).length
    }))
  } finally { loading.value = false }
}

function handleCreate() {
  modalType.value = 'create'
  currentRole.value = { roleCode: '', roleName: '', description: '', isProjectAdmin: false }
  showModal.value = true
}

function handleEdit(role: any) {
  modalType.value = 'edit'
  currentRole.value = { ...role }
  showModal.value = true
}

async function handleSave() {
  showModal.value = false
  await loadRoles()
}

function handleAssignPermissions(role: any) {
  currentRole.value = role
  selectedPermissions.value = mockRolePermissions.filter(rp => rp.roleId === role.id).map(rp => rp.permissionId)
  showPermModal.value = true
}

async function handleSavePermissions() {
  showPermModal.value = false
  await loadRoles()
}

async function handleDelete(role: any) {
  if (role.isProjectAdmin) { alert('项目管理员角色不能删除'); return }
  if (!confirm(`确定要删除角色 "${role.roleName}" 吗？`)) return
  await loadRoles()
}

onMounted(() => loadRoles())
</script>

<template>
  <div class="page-container project-role-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">角色管理</h1>
        <p class="page-desc">管理项目 "{{ projectStore.projectName }}" 的角色</p>
      </div>
      <button class="btn btn-primary" @click="handleCreate">+ 创建角色</button>
    </div>

    <div class="role-grid" v-if="!loading && roles.length > 0">
      <div class="role-card" v-for="role in roles" :key="role.id">
        <div class="role-header">
          <div class="role-name">
            {{ role.roleName }}
            <span class="admin-badge" v-if="role.isProjectAdmin">管理员</span>
          </div>
          <div class="role-code">{{ role.roleCode }}</div>
        </div>
        <div class="role-desc">{{ role.description || '暂无描述' }}</div>
        <div class="role-stats">
          <span class="stat-item"><span class="stat-label">权限数</span><span class="stat-value">{{ role.permissionCount }}</span></span>
        </div>
        <div class="role-actions">
          <button class="btn btn-sm" @click="handleAssignPermissions(role)">分配权限</button>
          <button class="btn btn-sm" @click="handleEdit(role)">编辑</button>
          <button class="btn btn-sm btn-danger" @click="handleDelete(role)" :disabled="role.isProjectAdmin">删除</button>
        </div>
      </div>
    </div>
    <div class="empty-state" v-else-if="!loading">暂无角色数据</div>
    <div class="loading-state" v-else>加载中...</div>

    <!-- 创建/编辑模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ modalType === 'create' ? '创建角色' : '编辑角色' }}</h2>
          <button class="modal-close" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>角色编码</label>
            <input v-model="currentRole.roleCode" type="text" :disabled="modalType === 'edit'" placeholder="如: operator" />
          </div>
          <div class="form-item">
            <label>角色名称</label>
            <input v-model="currentRole.roleName" type="text" placeholder="如: 运营人员" />
          </div>
          <div class="form-item">
            <label>角色描述</label>
            <textarea v-model="currentRole.description" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="handleSave">保存</button>
        </div>
      </div>
    </div>

    <!-- 权限分配模态框 -->
    <div class="modal-overlay" v-if="showPermModal" @click.self="showPermModal = false">
      <div class="modal modal-lg">
        <div class="modal-header">
          <h2>分配权限 - {{ currentRole.roleName }}</h2>
          <button class="modal-close" @click="showPermModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="permission-list">
            <label v-for="perm in projectPermissions" :key="perm.id" class="permission-item">
              <input type="checkbox" :value="perm.id" v-model="selectedPermissions" />
              <div class="permission-info">
                <span class="permission-name">{{ perm.permissionName }}</span>
                <span class="permission-code">{{ perm.permissionCode }}</span>
              </div>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <span class="selected-count">已选择 {{ selectedPermissions.length }} 个权限</span>
          <button class="btn" @click="showPermModal = false">取消</button>
          <button class="btn btn-primary" @click="handleSavePermissions">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
