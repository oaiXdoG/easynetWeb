<template>
  <el-aside width="200px" class="sidebar">
    <el-menu
      :default-active="activeKey"
      :default-openeds="openKeys"
      :key="openKeys.join(',')"
      class="menu"
      background-color="#fff"
      unique-opened
      @select="handleSelect"
    >
      <el-sub-menu v-for="module in modules" :key="module.key" :index="module.key">
        <template #title>
          <el-icon v-if="module.icon">
            <component :is="module.icon" />
          </el-icon>
          <span>{{ module.name }}</span>
        </template>
        <el-menu-item
          v-for="child in module.children"
          :key="child.key"
          :index="child.key"
        >
          <el-icon v-if="child.icon">
            <component :is="child.icon" />
          </el-icon>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ModuleConfig } from '@/types';

const props = defineProps<{
  modules: ModuleConfig[];
  selectedModule: string;
  selectedSubModule: string[];
  openKeys: string[];
}>();

const emit = defineEmits<{
  (e: 'select', payload: { index: string; indexPath: string[] }): void;
}>();

const activeKey = computed(() => props.selectedSubModule[0] || props.selectedModule);

function handleSelect(index: string, indexPath: string[]) {
  emit('select', { index, indexPath });
}
</script>

<style scoped>
.sidebar {
  background: #fff;
  border-right: 1px solid #f0f2f5;
}
.menu {
  height: 100%;
  border-right: none;
}
</style>
