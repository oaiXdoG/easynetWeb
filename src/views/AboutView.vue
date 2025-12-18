<script setup lang="ts">
</script>

<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是一个使用 Vue 3 + Vite + TypeScript 构建的项目</p>
    <router-link to="/" class="link">返回首页</router-link>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #35495e;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
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
