<script setup lang="ts">
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppSidebar from '@/components/Layout/AppSidebar.vue'
import AppMain from '@/components/Layout/AppMain.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <AppSidebar />
    <AppMain />
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
}
</style>
