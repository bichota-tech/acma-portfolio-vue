<template>
  <button
    class="toggle-dark-mode"
    @click="toggleTheme"
    aria-label="Alternar modo oscuro"
  >
    {{ theme.isDark ? '🌞' : '🌙' }}
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
const toggleTheme = () => theme.toggleTheme()
</script>

<style scoped>
.toggle-dark-mode {
  background: none;
  border-color: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.toggle-dark-mode:hover {
  border-color: var(--color-border-hover);
}
</style>
