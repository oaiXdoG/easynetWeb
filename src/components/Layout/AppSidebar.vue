<script setup lang="ts">
/**
 * 侧边栏组件
 *
 * 菜单数据来源：
 * 1. 前端定义全量菜单（src/config/menus.ts）
 * 2. 后端返回用户可见的 menuCode 列表
 * 3. menuStore 根据 menuCode 过滤出实际显示的菜单
 */
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores'
import '@/styles/layout/sidebar.css'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

// 从 store 获取过滤后的菜单
const menuGroups = computed(() => menuStore.filteredMenus)

// 检查是否激活
function isActive(path: string) {
  return route.path === path
}

// 导航
function handleNavigate(path: string) {
  router.push(path)
}

// 组件挂载时加载菜单
onMounted(async () => {
  if (!menuStore.isMenuLoaded) {
    await menuStore.loadMenus()
  }
})
</script>

<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <div v-for="group in menuGroups" :key="group.groupCode" class="nav-group">
        <div class="group-title">{{ group.groupTitle }}</div>
        <div
          v-for="item in group.children"
          :key="item.menuCode"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
          @click="handleNavigate(item.path)"
        >
          <span class="nav-icon material-icons">{{ item.icon }}</span>
          <span class="nav-text">{{ item.menuName }}</span>
        </div>
      </div>
    </nav>
  </aside>
</template>
