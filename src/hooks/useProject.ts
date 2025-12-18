/**
 * 项目上下文 Hook
 */

import { computed, watch } from 'vue'
import { useAuthStore, useProjectStore, useMenuStore } from '@/stores'
import type { ProjectListItem } from '@/types'

export function useProject() {
  const authStore = useAuthStore()
  const projectStore = useProjectStore()
  const menuStore = useMenuStore()

  // 当前项目
  const currentProject = computed(() => projectStore.currentProject)

  // 项目 ID
  const projectId = computed(() => projectStore.projectId)

  // 项目名称
  const projectName = computed(() => projectStore.projectName)

  // 用户可访问的项目列表
  const userProjects = computed(() => authStore.userProjects)

  // 是否是项目管理员
  const isProjectAdmin = computed(() => projectStore.isProjectAdmin)

  /**
   * 切换项目
   * @param projectId 项目ID
   */
  async function switchProject(projectId: number) {
    const project = await projectStore.switchProject(projectId)
    // 重新加载菜单
    await menuStore.loadMenus()
    return project
  }

  /**
   * 初始化默认项目
   */
  async function initProject() {
    if (userProjects.value.length > 0) {
      const project = await projectStore.initDefaultProject(userProjects.value)
      if (project) {
        await menuStore.loadMenus()
      }
      return project
    }
    return null
  }

  return {
    currentProject,
    projectId,
    projectName,
    userProjects,
    isProjectAdmin,
    switchProject,
    initProject
  }
}
