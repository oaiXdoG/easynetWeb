<script setup lang="ts">
/**
 * 项目管理页面
 * API: api/system/index.ts
 */
import { ref, computed, onMounted } from 'vue'
import { mockProjects } from '@/mock/data'
// import { systemApi } from '@/api'

const projects = ref<any[]>([])
const searchKeyword = ref('')
const statusFilter = ref<number | ''>('')
const loading = ref(false)
const showModal = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const currentProject = ref<any>({})

const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchKeyword = !searchKeyword.value ||
      p.projectCode.includes(searchKeyword.value) ||
      p.projectName.includes(searchKeyword.value)
    const matchStatus = statusFilter.value === '' || p.status === statusFilter.value
    return matchKeyword && matchStatus
  })
})

async function loadProjects() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    projects.value = mockProjects
  } finally {
    loading.value = false
  }
}

function handleCreate() {
  modalType.value = 'create'
  currentProject.value = { projectCode: '', projectName: '', description: '', status: 1 }
  showModal.value = true
}

function handleEdit(project: any) {
  modalType.value = 'edit'
  currentProject.value = { ...project }
  showModal.value = true
}

async function handleSave() {
  showModal.value = false
  await loadProjects()
}

async function handleToggleStatus(project: any) {
  project.status = project.status === 1 ? 0 : 1
}

async function handleDelete(project: any) {
  if (!confirm(`确定要删除项目 "${project.projectName}" 吗？`)) return
  await loadProjects()
}

onMounted(() => loadProjects())
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">项目管理</h1>
      <button class="btn btn-primary" @click="handleCreate">+ 创建项目</button>
    </div>

    <div class="filter-bar">
      <input v-model="searchKeyword" type="text" class="search-input" placeholder="搜索项目编码、名称..." />
      <select v-model="statusFilter" class="status-select">
        <option value="">全部状态</option>
        <option :value="1">启用</option>
        <option :value="0">禁用</option>
      </select>
    </div>

    <div class="project-grid" v-if="!loading && filteredProjects.length > 0">
      <div class="project-card" v-for="project in filteredProjects" :key="project.id">
        <div class="project-logo">
          <span class="logo-placeholder">{{ project.projectName.charAt(0) }}</span>
        </div>
        <div class="project-info">
          <div class="project-name">{{ project.projectName }}</div>
          <div class="project-code">{{ project.projectCode }}</div>
          <div class="project-desc">{{ project.description || '暂无描述' }}</div>
        </div>
        <div class="project-status">
          <span class="status-tag" :class="project.status === 1 ? 'active' : 'inactive'">
            {{ project.status === 1 ? '启用' : '禁用' }}
          </span>
        </div>
        <div class="project-actions">
          <button class="btn-icon" @click="handleEdit(project)">✏️</button>
          <button class="btn-icon" @click="handleToggleStatus(project)">{{ project.status === 1 ? '🚫' : '✅' }}</button>
          <button class="btn-icon" @click="handleDelete(project)">🗑️</button>
        </div>
      </div>
    </div>
    <div class="empty-state" v-else-if="!loading">暂无项目数据</div>
    <div class="loading-state" v-else>加载中...</div>

    <!-- 模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ modalType === 'create' ? '创建项目' : '编辑项目' }}</h2>
          <button class="modal-close" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>项目编码</label>
            <input v-model="currentProject.projectCode" type="text" :disabled="modalType === 'edit'" placeholder="如: ecommerce" />
          </div>
          <div class="form-item">
            <label>项目名称</label>
            <input v-model="currentProject.projectName" type="text" placeholder="如: 电商管理系统" />
          </div>
          <div class="form-item">
            <label>项目描述</label>
            <textarea v-model="currentProject.description" rows="3" placeholder="项目简介..."></textarea>
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
.page-container { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
.filter-bar { display: flex; gap: 16px; margin-bottom: 20px; }
.search-input { width: 300px; height: 36px; padding: 0 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-card); color: var(--text-color); }
.status-select { height: 36px; padding: 0 12px; border: 1px solid var(--border-color); border-radius: 4px; min-width: 120px; background: var(--bg-card); color: var(--text-color); }
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.project-card { border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 12px; transition: box-shadow 0.2s ease; }
.project-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
.project-logo { width: 48px; height: 48px; border-radius: 8px; background: #42b883; display: flex; align-items: center; justify-content: center; }
.logo-placeholder { color: #fff; font-size: 20px; font-weight: bold; }
.project-info { flex: 1; }
.project-name { font-size: 16px; font-weight: 600; color: var(--text-color); margin-bottom: 4px; }
.project-code { font-size: 12px; color: var(--text-muted); font-family: monospace; margin-bottom: 8px; }
.project-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
.status-tag { padding: 4px 12px; border-radius: 4px; font-size: 12px; }
.status-tag.active { background: rgba(56, 142, 60, 0.15); color: #38a169; }
.status-tag.inactive { background: rgba(198, 40, 40, 0.15); color: #e74c3c; }
.project-actions { display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid var(--border-color); }
.btn-icon { background: none; border: none; cursor: pointer; padding: 4px 8px; font-size: 16px; opacity: 0.7; }
.btn-icon:hover { opacity: 1; }
.empty-state, .loading-state { text-align: center; padding: 60px; color: var(--text-muted); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; width: 500px; max-width: 90%; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border-color); }
.modal-header h2 { font-size: 18px; margin: 0; }
.modal-close { background: none; border: none; font-size: 24px; color: #999; cursor: pointer; }
.modal-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.form-item { display: flex; flex-direction: column; gap: 6px; }
.form-item label { font-size: 14px; color: var(--text-color); }
.form-item input, .form-item textarea { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-card); color: var(--text-color); }
.form-item input { height: 36px; }
.form-item input:disabled { background: var(--hover-bg); }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 20px; border-top: 1px solid var(--border-color); }
.btn { padding: 8px 16px; border-radius: 4px; font-size: 14px; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-card); }
.btn-primary { background: #42b883; border-color: #42b883; color: #fff; }
</style>
