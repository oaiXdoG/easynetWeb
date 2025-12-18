<script setup lang="ts">
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/" class="link">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

h1 {
  font-size: 5rem;
  color: #ccc;
  margin-bottom: 0;
}

p {
  font-size: 1.5rem;
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
