<template>
  <header role="banner" :class="['app-header', { 'scrolled': isScrolled }]">
    <IdentityLogo />
    <ToggleLightMode />
  </header>
  <NavigationMenu />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleLightMode from '@/plugins/ToggleLightMode.vue'
import NavigationMenu from '../ui/NavigationMenu.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  z-index: 150;
  pointer-events: none;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-bottom 0.4s ease;
  background-color: transparent;
  border-bottom: 1px solid transparent;
}

/* Reactivamos los eventos de puntero en los componentes hijos */
.app-header > * {
  pointer-events: auto;
}

.app-header.scrolled {
  background-color: var(--bg-primary, var(--bg-primary, rgba(10, 17, 40, 0.9)));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(245, 81, 57, 0.2); /* color terracota de acento suave */
}

@media (max-width: 768px) {
  .app-header {
    height: 4.5rem;
  }
}
</style>
