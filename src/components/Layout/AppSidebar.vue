<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores'
import '@/styles/layout/sidebar.css'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

// 从 store 获取菜单分组
const menuGroups = computed(() => menuStore.visibleMenuGroups)

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
      <div v-for="group in menuGroups" :key="group.id" class="nav-group">
        <div class="group-title">{{ group.groupTitle }}</div>
        <div
          v-for="item in group.children"
          :key="item.path"
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
