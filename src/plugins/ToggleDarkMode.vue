<template>
  <div class="toggle lg:block fixed right-5">
    <button
      class="toggle-dark-mode flex items-center justify-right"
      @click="toggleTheme"
      :aria-label="theme.isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
      >
      <Sun v-if = "theme.isDark" class="w-8 h-8" />
      <Moon v-else class="w-8 h-8" />
    </button>
  </div>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
const toggleTheme = () => theme.toggleTheme()
</script>

<style scoped>
.toggle-dark-mode {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}
@media (min-width: 720px) {
  .toggle{
    right: 5%;
  }
}
</style>
