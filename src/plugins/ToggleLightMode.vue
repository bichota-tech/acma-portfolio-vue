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
.toggle {
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: 200;
}

.toggle-light-mode {
  cursor: pointer;
  color: var(--text-primary);
  padding: .3rem;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

@media (max-width: 768px) {
  .toggle {
    top: 0.8rem;
    right: 2rem;
  }
}
</style>
