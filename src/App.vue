<!-- src/App.vue -->
<template>
  <ParticlesBackground ref="particlesRef" />

  <!-- Header persistente -->
  <AppHeader />
  <main>

    <!-- Contenido dinámico de la vista -->
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.name" />
      </Transition>
    </RouterView>

  </main>
  <!-- Footer persistente -->
  <!-- <AppFooter /> -->
</template>

<script setup>
import ParticlesBackground from './components/ui/ParticlesBackground.vue'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

import AppHeader from '@/components/layout/AppHeader.vue'
/* import AppFooter from '@/components/layout/AppFooter.vue' */

const theme = useThemeStore()
const particlesRef = ref(null)
const router = useRouter()
const navStore = useNavigationStore()

onMounted(() => {
  theme.applyTheme()
})

// Escuchar petición de navegación: transición suave
watch(() => navStore.targetRoute, async (newRoute) => {
  if (!newRoute) return

  // Navegar - la transición CSS "fade" se activa automáticamente
  await router.push({ name: newRoute }).catch(() => {})

  // Resetear el store
  navStore.targetRoute = null
})
</script>

<style scoped>
/* ─── Transición Fluida (Fade) ─── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: opacity, transform;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
