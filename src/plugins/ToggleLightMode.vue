<template>
  <div class="toggle lg:block fixed right-5">
    <button
      class="toggle-light-mode flex items-center justify-center glassmorphic w-12 h-12 transition-all duration-300 group"
      @click="toggleTheme"
      :aria-label="theme.isLight ? 'Activar modo oscuro' : 'Activar modo claro'"
      >
      <Moon v-if = "theme.isLight" class="w-7 h-7" />
      <Sun v-else class="w-7 h-7" />
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
  cursor: pointer;
  color: var(--color-text);
  padding: .3rem;
}
@media (min-width: 720px) {
  .toggle{
    right: 4%;
  }
}
</style>
