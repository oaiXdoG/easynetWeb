import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const count = ref(0)
  const loading = ref(false)

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  return {
    count,
    loading,
    doubleCount,
    increment,
    decrement,
    setLoading
  }
})
