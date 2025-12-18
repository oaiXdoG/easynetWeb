<template>
  <el-container class="dashboard-layout">
    <DashboardHeader
      :user-info="userInfo"
      :apps="apps"
      :current-app="currentApp"
      :on-app-switch="handleAppSwitch"
    />

    <el-container class="dashboard-body">
      <DashboardSidebar
        :modules="modules"
        :selected-module="selectedModule"
        :selected-sub-module="selectedSubModule"
        :open-keys="openKeys"
        @select="handleMenuSelect"
      />

      <el-container direction="vertical" class="dashboard-main">
        <TabBar
          :tabs="tabs"
          :active-tab="activeTab"
          @change="switchTab"
          @close="closeTab"
          @close-all="closeAllTabs"
          @close-others="closeOtherTabs"
          @go-home="() => router.push('/system')"
        />

        <el-main class="dashboard-content">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DashboardHeader from '@/components/DashboardHeader.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue';
import TabBar from '@/components/TabBar.vue';
import { cache } from '@/utils/cacheManager';
import { getAdminMenus, shouldShowProjectSwitch } from '@/config/modules';
import type { AppConfig, ModuleConfig, TabItem, UserInfo } from '@/types';

const router = useRouter();
const route = useRoute();

const userInfo = ref<UserInfo | null>(null);
const modules = ref<ModuleConfig[]>([]);
const selectedModule = ref('');
const selectedSubModule = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const apps = ref<AppConfig[]>([]);
const currentApp = ref<AppConfig | null>(null);

const tabs = ref<TabItem[]>([]);
const activeTab = ref('');

onMounted(() => {
  initializeDashboard();
});

watch(
  () => route.fullPath,
  (path) => {
    if (modules.value.length > 0) {
      updateMenuState(path);
    }
  }
);

function initializeDashboard() {
  const info = cache.getUserInfo();
  if (!info) {
    router.replace('/login');
    return;
  }
  userInfo.value = info;

  // 当前仅提供本地 admin 菜单
  modules.value = getAdminMenus();

  // 预留项目切换位
  if (shouldShowProjectSwitch(info.username)) {
    apps.value = [];
    currentApp.value = null;
  }

  updateMenuState(route.fullPath);
}

function updateMenuState(path: string) {
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) return;

  const moduleId = parts[0] ?? '';
  const subId = parts[1];

  selectedModule.value = moduleId;
  openKeys.value = [moduleId];

  if (subId) {
    selectedSubModule.value = [subId];
    const module = modules.value.find((m) => m.key === moduleId);
    const subModule = module?.children?.find((c) => c.key === subId);
    if (module && subModule) {
      addTab(createTab(module, subModule));
    }
  } else {
    selectedSubModule.value = [];
  }
}

function handleMenuSelect(payload: { index: string; indexPath: string[] }) {
  const { index } = payload;

  // 一级模块点击
  const module = modules.value.find((m) => m.key === index);
  if (module) {
    selectedModule.value = module.key;
    selectedSubModule.value = [];
    openKeys.value = [module.key];
    router.push(module.path);
    return;
  }

  // 二级模块点击
  for (const mod of modules.value) {
    const child = mod.children?.find((c) => c.key === index);
    if (child) {
      selectedModule.value = mod.key;
      selectedSubModule.value = [child.key];
      openKeys.value = [mod.key];
      addTab(createTab(mod, child));
      router.push(child.path);
      return;
    }
  }
}

function createTab(module: ModuleConfig, sub?: ModuleConfig): TabItem {
  const target = sub || module;
  return {
    key: target.key,
    title: target.name,
    icon: target.icon,
    path: target.path,
    closable: true,
    moduleKey: module.key,
    subModuleKey: sub?.key
  };
}

function addTab(tab: TabItem) {
  const exists = tabs.value.find((t) => t.key === tab.key);
  if (exists) {
    activeTab.value = exists.key;
    return;
  }
  tabs.value.push(tab);
  activeTab.value = tab.key;
}

function closeTab(key: string) {
  const index = tabs.value.findIndex((t) => t.key === key);
  tabs.value = tabs.value.filter((t) => t.key !== key);

  if (activeTab.value === key) {
    if (tabs.value.length) {
      const nextIndex = index > 0 ? index - 1 : 0;
      const nextTab = tabs.value[nextIndex] || tabs.value[0];
      if (nextTab) {
        activeTab.value = nextTab.key;
        router.push(nextTab.path);
      }
    } else {
      activeTab.value = '';
      selectedSubModule.value = [];
      router.push(selectedModule.value ? `/${selectedModule.value}` : '/system');
    }
  }
}

function switchTab(key: string) {
  const tab = tabs.value.find((t) => t.key === key);
  if (tab) {
    activeTab.value = key;
    router.push(tab.path);
  }
}

function closeAllTabs() {
  tabs.value = [];
  activeTab.value = '';
  selectedSubModule.value = [];
  const target = selectedModule.value ? `/${selectedModule.value}` : '/system';
  router.push(target);
}

function closeOtherTabs(keepKey: string) {
  const keepTab = tabs.value.find((t) => t.key === keepKey);
  if (keepTab) {
    tabs.value = [keepTab];
    activeTab.value = keepKey;
  }
}

function handleAppSwitch(app: AppConfig) {
  currentApp.value = app;
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}
.dashboard-body {
  min-height: calc(100vh - 64px);
}
.dashboard-main {
  background: #f5f7fa;
}
.dashboard-content {
  padding: 0;
  background: #f5f7fa;
}
</style>
