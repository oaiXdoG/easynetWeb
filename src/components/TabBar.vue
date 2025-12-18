<template>
  <div v-if="tabs.length" class="tabbar">
    <div class="tabs">
      <el-tabs
        v-model="current"
        type="card"
        size="small"
        @tab-click="onTabClick"
        @tab-remove="onTabRemove"
      >
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.key"
          :name="tab.key"
          :closable="tab.closable !== false"
        >
          <template #label>
            <span class="tab-label">
              <el-icon v-if="tab.icon" class="tab-icon">
                <component :is="tab.icon" />
              </el-icon>
              <span>{{ tab.title }}</span>
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="actions">
      <el-button text size="small" @click="$emit('goHome')">
        <el-icon><House /></el-icon>
      </el-button>
      <el-button text size="small" @click="emit('closeOthers', current)">关闭其他</el-button>
      <el-button text size="small" @click="$emit('closeAll')">
        <el-icon><Close /></el-icon>
        关闭所有
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Close, House } from '@element-plus/icons-vue';
import type { TabItem } from '@/types';

const props = defineProps<{
  tabs: TabItem[];
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'change', key: string): void;
  (e: 'close', key: string): void;
  (e: 'closeAll'): void;
  (e: 'closeOthers', key: string): void;
  (e: 'goHome'): void;
}>();

const current = computed({
  get: () => props.activeTab,
  set: (val: string) => emit('change', val)
});

function onTabClick(tab: any) {
  emit('change', tab.paneName as string);
}

function onTabRemove(name: string) {
  emit('close', name);
}
</script>

<style scoped>
.tabbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f2f5;
  padding-left: 4px;
}
.tabs {
  flex: 1;
}
.tab-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.tab-icon {
  font-size: 14px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-right: 12px;
}
</style>
