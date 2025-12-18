<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h1>Welcome to EasyNet Web</h1>
    <p>Vue 3 + Vite + TypeScript 项目模板</p>
    <router-link to="/about" class="link">关于我们</router-link>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #42b883;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.link {
  color: #42b883;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #42b883;
  border-radius: 4px;
  transition: all 0.3s;
}

.link:hover {
  background-color: #42b883;
  color: white;
}
</style>
