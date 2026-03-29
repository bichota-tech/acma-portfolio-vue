<template>
  <div class="toggle lg:block fixed right-5">
    <button
      class="toggle-light-mode flex items-center justify-right"
      @click="toggleTheme"
      :aria-label="theme.isLight ? 'Activar modo oscuro' : 'Activar modo claro'"
      >
      <Moon v-if = "theme.isLight" class="w-8 h-8" />
      <Sun v-else class="w-8 h-8" />
    </button>
  </div>
</template>

<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
const toggleTheme = () => theme.toggleTheme()
</script>

<style scoped>
.toggle-light-mode {
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
