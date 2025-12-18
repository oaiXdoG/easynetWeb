<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { mockProjects } from '@/mock/data'
import type { ProjectListItem } from '@/types'

// 项目列表
const projects = ref<ProjectListItem[]>([])
// 搜索关键词
const searchKeyword = ref('')
// 状态筛选
const statusFilter = ref<number | ''>('')
// 加载状态
const loading = ref(false)

// 模态框状态
const showModal = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const currentProject = ref<Partial<ProjectListItem & { description?: string }>>({})

// 筛选后的项目列表
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchKeyword = !searchKeyword.value ||
      project.projectCode.includes(searchKeyword.value) ||
      project.projectName.includes(searchKeyword.value)

    const matchStatus = statusFilter.value === '' ||
      project.status === statusFilter.value

    return matchKeyword && matchStatus
  })
})

// 加载项目列表
async function loadProjects() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    projects.value = mockProjects.map(p => ({
      id: p.id,
      projectCode: p.projectCode,
      projectName: p.projectName,
      description: p.description,
      logo: p.logo,
      status: p.status
    }))
  } finally {
    loading.value = false
  }
}

// 打开创建模态框
function handleCreate() {
  modalType.value = 'create'
  currentProject.value = {
    projectCode: '',
    projectName: '',
    description: '',
    status: 1
  }
  showModal.value = true
}

// 打开编辑模态框
function handleEdit(project: ProjectListItem) {
  modalType.value = 'edit'
  currentProject.value = { ...project }
  showModal.value = true
}

// 保存项目
async function handleSave() {
  console.log('保存项目:', currentProject.value)
  showModal.value = false
  await loadProjects()
}

// 切换状态
async function handleToggleStatus(project: ProjectListItem) {
  project.status = project.status === 1 ? 0 : 1
}

// 删除项目
async function handleDelete(project: ProjectListItem) {
  if (!confirm(`确定要删除项目 "${project.projectName}" 吗？`)) return
  console.log('删除项目:', project.id)
  await loadProjects()
}

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <div class="project-manage-page">
    <div class="page-header">
      <h1 class="page-title">项目管理</h1>
      <button class="btn btn-primary" @click="handleCreate">
        + 创建项目
      </button>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="搜索项目编码、项目名称..."
      />
      <select v-model="statusFilter" class="status-select">
        <option value="">全部状态</option>
        <option :value="1">启用</option>
        <option :value="0">禁用</option>
      </select>
    </div>

    <!-- 项目卡片列表 -->
    <div class="project-grid" v-if="!loading && filteredProjects.length > 0">
      <div
        class="project-card"
        v-for="project in filteredProjects"
        :key="project.id"
      >
        <div class="project-logo">
          <img v-if="project.logo" :src="project.logo" alt="logo" />
          <span v-else class="logo-placeholder">{{ project.projectName.charAt(0) }}</span>
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
          <button class="btn-icon" @click="handleEdit(project)" title="编辑">
            ✏️
          </button>
          <button
            class="btn-icon"
            @click="handleToggleStatus(project)"
            :title="project.status === 1 ? '禁用' : '启用'"
          >
            {{ project.status === 1 ? '🚫' : '✅' }}
          </button>
          <button class="btn-icon" @click="handleDelete(project)" title="删除">
            🗑️
          </button>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else-if="!loading">
      暂无项目数据
    </div>

    <div class="loading-state" v-else>
      加载中...
    </div>

    <!-- 创建/编辑模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ modalType === 'create' ? '创建项目' : '编辑项目' }}</h2>
          <button class="modal-close" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label class="form-label">项目编码</label>
            <input
              v-model="currentProject.projectCode"
              type="text"
              class="form-input"
              :disabled="modalType === 'edit'"
              placeholder="英文编码，如: ecommerce"
            />
          </div>
          <div class="form-item">
            <label class="form-label">项目名称</label>
            <input
              v-model="currentProject.projectName"
              type="text"
              class="form-input"
              placeholder="如: 电商管理系统"
            />
          </div>
          <div class="form-item">
            <label class="form-label">项目描述</label>
            <textarea
              v-model="currentProject.description"
              class="form-textarea"
              rows="3"
              placeholder="项目简介..."
            ></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">Logo URL</label>
            <input
              v-model="currentProject.logo"
              type="text"
              class="form-input"
              placeholder="可选，项目图标地址"
            />
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
.project-manage-page {
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

/* 项目卡片网格 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.project-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.3s;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  background: #42b883;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-placeholder {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.project-code {
  font-size: 12px;
  color: #999;
  font-family: monospace;
  margin-bottom: 8px;
}

.project-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-status {
  display: flex;
  align-items: center;
}

.status-tag {
  padding: 4px 12px;
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

.project-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.btn-icon:hover {
  opacity: 1;
}

.empty-state,
.loading-state {
  text-align: center;
  padding: 60px;
  color: #999;
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

.form-textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}
</style>
