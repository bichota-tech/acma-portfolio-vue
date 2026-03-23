<template>
  <button
    class="toggle-dark-mode flex items-center justify-center"
    @click="toggleTheme"
    :aria-label="theme.isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
  >
    <Sun v-if = "theme.isDark" class="w-8 h-8" />
    <Moon v-else class="w-8 h-8" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
const toggleTheme = () => theme.toggleTheme()
</script>

<style scoped>

</style>
