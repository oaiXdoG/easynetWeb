<script setup lang="ts">
/**
 * 项目管理页面
 * API: api/system/index.ts
 */
import { ref, computed, onMounted } from 'vue'
import { mockProjects } from '@/mock/data'
import '@/styles/views/system/project.css'
import '@/styles/views/system/project.css'
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
  <div class="page-container system-project-page">
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
