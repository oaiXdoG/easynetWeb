/**
 * 项目上下文状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CurrentProjectContext, ProjectListItem } from '@/types'
import { storage } from '@/utils/storage'
import { mockSwitchProjectResponse, mockLoginResponse } from '@/mock/data'

const CURRENT_PROJECT_KEY = 'easynet_current_project'

export const useProjectStore = defineStore('project', () => {
  // 状态
  const currentProject = ref<CurrentProjectContext | null>(
    storage.get(CURRENT_PROJECT_KEY)
  )

  // 计算属性
  const projectId = computed(() => currentProject.value?.id ?? null)
  const projectCode = computed(() => currentProject.value?.projectCode ?? null)
  const projectName = computed(() => currentProject.value?.projectName ?? '')
  const isProjectAdmin = computed(() =>
    currentProject.value?.roles.some(r => r.isProjectAdmin) ?? false
  )

  // 设置当前项目
  function setCurrentProject(project: CurrentProjectContext) {
    currentProject.value = project
    storage.set(CURRENT_PROJECT_KEY, project)
  }

  // 切换项目
  async function switchProject(projectId: number): Promise<CurrentProjectContext> {
    // TODO: 替换为真实 API 调用
    // const res = await projectApi.switchProject(projectId)

    // 模拟切换项目
    await new Promise(resolve => setTimeout(resolve, 300))

    let projectData: CurrentProjectContext

    if (projectId === 1) {
      projectData = mockLoginResponse.data.currentProject
    } else if (projectId === 2) {
      projectData = mockSwitchProjectResponse.data.currentProject
    } else {
      throw new Error('项目不存在')
    }

    setCurrentProject(projectData)
    return projectData
  }

  // 清除当前项目
  function clearCurrentProject() {
    currentProject.value = null
    storage.remove(CURRENT_PROJECT_KEY)
  }

  // 初始化默认项目
  async function initDefaultProject(projects: ProjectListItem[]) {
    if (currentProject.value) return currentProject.value

    const defaultProject = projects.find(p => p.isDefault) || projects[0]
    if (defaultProject) {
      return await switchProject(defaultProject.id)
    }
    return null
  }

  return {
    // 状态
    currentProject,
    // 计算属性
    projectId,
    projectCode,
    projectName,
    isProjectAdmin,
    // 方法
    setCurrentProject,
    switchProject,
    clearCurrentProject,
    initDefaultProject
  }
})
