<script setup lang="ts">
/**
 * 权限配置页面
 * API: api/project/index.ts
 */
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores'
import { mockPermissions } from '@/mock/data'
// import { projectApi } from '@/api'

const projectStore = useProjectStore()
const permissions = ref<any[]>([])
const searchKeyword = ref('')
const loading = ref(false)
const showModal = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const currentPermission = ref<any>({})

const filteredPermissions = computed(() => {
  return permissions.value.filter(p => !searchKeyword.value ||
    p.permissionCode.includes(searchKeyword.value) || p.permissionName.includes(searchKeyword.value))
})

const groupedPermissions = computed(() => {
  const groups: Record<string, any[]> = {}
  filteredPermissions.value.forEach(perm => {
    const prefix = perm.permissionCode.split(':')[1] || 'other'
    if (!groups[prefix]) groups[prefix] = []
    groups[prefix].push(perm)
  })
  return groups
})

async function loadPermissions() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    permissions.value = mockPermissions.filter(p => p.projectId === projectStore.projectId)
  } finally { loading.value = false }
}

function handleCreate() {
  modalType.value = 'create'
  currentPermission.value = { permissionCode: '', permissionName: '', description: '', permissionType: 'action' }
  showModal.value = true
}

function handleEdit(perm: any) {
  modalType.value = 'edit'
  currentPermission.value = { ...perm }
  showModal.value = true
}

async function handleSave() {
  showModal.value = false
  await loadPermissions()
}

async function handleDelete(perm: any) {
  if (!confirm(`确定要删除权限 "${perm.permissionName}" 吗？`)) return
  await loadPermissions()
}

function getGroupTitle(key: string) {
  const titles: Record<string, string> = {
    product: '商品相关', order: '订单相关', customer: '客户相关',
    opportunity: '商机相关', report: '报表相关', approval: '审批相关',
    attendance: '考勤相关', notice: '公告相关', member: '成员相关', other: '其他'
  }
  return titles[key] || key
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = { menu: '菜单', action: '操作', data: '数据' }
  return labels[type] || type
}

onMounted(() => loadPermissions())
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">权限配置</h1>
        <p class="page-desc">管理项目 "{{ projectStore.projectName }}" 的权限</p>
      </div>
      <button class="btn btn-primary" @click="handleCreate">+ 创建权限</button>
    </div>

    <div class="filter-bar">
      <input v-model="searchKeyword" type="text" class="search-input" placeholder="搜索权限编码、名称..." />
    </div>

    <div class="permission-content" v-if="!loading">
      <div class="permission-group" v-for="(perms, group) in groupedPermissions" :key="group">
        <div class="group-header">
          <span class="group-title">{{ getGroupTitle(group) }}</span>
          <span class="group-count">{{ perms.length }} 个权限</span>
        </div>
        <div class="permission-list">
          <div class="permission-item" v-for="perm in perms" :key="perm.id">
            <div class="perm-main">
              <div class="perm-name">{{ perm.permissionName }}</div>
              <div class="perm-code">{{ perm.permissionCode }}</div>
            </div>
            <div class="perm-meta">
              <span class="perm-type" :class="perm.permissionType">{{ getTypeLabel(perm.permissionType) }}</span>
            </div>
            <div class="perm-actions">
              <button class="btn-icon" @click="handleEdit(perm)">✏️</button>
              <button class="btn-icon" @click="handleDelete(perm)">🗑️</button>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-state" v-if="Object.keys(groupedPermissions).length === 0">暂无权限数据</div>
    </div>
    <div class="loading-state" v-else>加载中...</div>

    <!-- 创建/编辑模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ modalType === 'create' ? '创建权限' : '编辑权限' }}</h2>
          <button class="modal-close" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>权限编码</label>
            <input v-model="currentPermission.permissionCode" type="text" :disabled="modalType === 'edit'" placeholder="如: ecommerce:product:create" />
            <p class="form-hint">格式: 项目:模块:操作</p>
          </div>
          <div class="form-item">
            <label>权限名称</label>
            <input v-model="currentPermission.permissionName" type="text" placeholder="如: 创建商品" />
          </div>
          <div class="form-item">
            <label>权限类型</label>
            <select v-model="currentPermission.permissionType">
              <option value="action">操作权限</option>
              <option value="menu">菜单权限</option>
              <option value="data">数据权限</option>
            </select>
          </div>
          <div class="form-item">
            <label>权限描述</label>
            <textarea v-model="currentPermission.description" rows="3"></textarea>
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
.page-container { background: #fff; border-radius: 8px; padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
.page-desc { font-size: 14px; color: #999; margin-top: 4px; }
.filter-bar { margin-bottom: 20px; }
.search-input { width: 300px; height: 36px; padding: 0 12px; border: 1px solid #ddd; border-radius: 4px; }
.permission-group { margin-bottom: 24px; }
.group-header { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eee; margin-bottom: 12px; }
.group-title { font-size: 16px; font-weight: 600; color: #333; }
.group-count { font-size: 12px; color: #999; }
.permission-list { display: flex; flex-direction: column; gap: 8px; }
.permission-item { display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: #f9f9f9; border-radius: 6px; }
.permission-item:hover { background: #f0f0f0; }
.perm-main { flex: 1; }
.perm-name { font-size: 14px; font-weight: 500; color: #333; }
.perm-code { font-size: 12px; color: #42b883; font-family: monospace; margin-top: 2px; }
.perm-type { padding: 2px 8px; border-radius: 4px; font-size: 12px; background: #f5f5f5; color: #666; }
.perm-type.action { background: #e3f2fd; color: #1976d2; }
.perm-type.menu { background: #e8f5e9; color: #388e3c; }
.perm-type.data { background: #fff3e0; color: #f57c00; }
.perm-actions { display: flex; gap: 4px; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 4px; font-size: 14px; opacity: 0.6; }
.btn-icon:hover { opacity: 1; }
.empty-state, .loading-state { text-align: center; padding: 60px; color: #999; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 8px; width: 500px; max-width: 90%; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #eee; }
.modal-header h2 { font-size: 18px; margin: 0; }
.modal-close { background: none; border: none; font-size: 24px; color: #999; cursor: pointer; }
.modal-body { padding: 20px; }
.form-item { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
.form-item label { font-size: 14px; color: #333; }
.form-item input, .form-item select, .form-item textarea { padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; }
.form-item input { height: 36px; }
.form-item input:disabled { background: #f5f5f5; }
.form-hint { font-size: 12px; color: #999; margin-top: 4px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 20px; border-top: 1px solid #eee; }
.btn { padding: 8px 16px; border-radius: 4px; font-size: 14px; cursor: pointer; border: 1px solid #ddd; background: #fff; }
.btn-primary { background: #42b883; border-color: #42b883; color: #fff; }
</style>
