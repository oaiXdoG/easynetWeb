<script setup lang="ts">
</script>

<template>
  <main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.app-main {
  margin-left: 210px;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  padding: 22px;
  background: var(--bg-body);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
