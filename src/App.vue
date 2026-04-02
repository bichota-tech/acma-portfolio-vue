<!-- src/App.vue -->
<template>
  <ParticlesBackground ref="particlesRef" />

  <!-- Header persistente -->
  <AppHeader />
  <main>

    <!-- Overlay de transición (scanline flash) -->
    <Transition name="scanline-overlay">
      <div v-if="isTransitioning" class="scanline-overlay" aria-hidden="true">
        <div class="scanline-bar" />
      </div>
    </Transition>

    <!-- Contenido dinámico de la vista con transición Cyber Portal -->
    <RouterView v-slot="{ Component }">
      <Transition name="portal" mode="out-in">
        <component :is="Component" :key="$route.name" />
      </Transition>
    </RouterView>

  </main>
  <!-- Footer persistente -->
  <AppFooter />
</template>

<script setup>
import ParticlesBackground from './components/ui/ParticlesBackground.vue'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const theme = useThemeStore()
const particlesRef = ref(null)
const router = useRouter()
const navStore = useNavigationStore()
const isTransitioning = ref(false)

onMounted(() => {
  theme.applyTheme()
})

// Escuchar petición de navegación: Warp Drive + Cyber Portal transition
watch(() => navStore.targetRoute, async (newRoute) => {
  if (!newRoute) return

  // 1. Activar el overlay de scanline
  isTransitioning.value = true

  // 2. Disparar el efecto de partículas
  if (particlesRef.value?.triggerWarp) {
    particlesRef.value.triggerWarp()
  }

  // 3. Navegar - la transición CSS "portal" se activa automáticamente
  await router.push({ name: newRoute }).catch(() => {})

  // 4. Apagar el overlay y resetear el store
  setTimeout(() => {
    isTransitioning.value = false
    navStore.targetRoute = null
  }, 600)
})
</script>

<style scoped>

/* ─── Overlay: barra de scanline que barre la pantalla ─── */
.scanline-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  pointer-events: none;
  overflow: hidden;
}

.scanline-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-terracota, #f55139) 20%,
    #fff 50%,
    var(--color-terracota, #f55139) 80%,
    transparent 100%
  );
  box-shadow:
    0 0 12px 4px var(--color-terracota, #f55139),
    0 0 40px 10px rgba(245, 81, 57, 0.4);
  animation: scanSweep 0.55s cubic-bezier(0.4, 0, 0.6, 1) forwards;
}

@keyframes scanSweep {
  0%   { top: -4px;   opacity: 1; }
  85%  { top: 102%;   opacity: 1; }
  100% { top: 102%;   opacity: 0; }
}

/* Fade del overlay contenedor */
.scanline-overlay-enter-active { transition: opacity 0.1s; }
.scanline-overlay-leave-active { transition: opacity 0.2s ease 0.4s; }
.scanline-overlay-enter-from   { opacity: 0; }
.scanline-overlay-leave-to     { opacity: 0; }

/* ─── Transición Cyber Portal: colapso/expansión vertical ─── */
/* SALIDA: la vista colapsa hacia una línea horizontal en el centro */
.portal-leave-active {
  transition:
    clip-path 0.28s cubic-bezier(0.4, 0, 1, 1),
    filter 0.28s ease,
    opacity 0.28s ease;
  will-change: clip-path, filter;
}
.portal-leave-to {
  clip-path: inset(50% 0 50% 0 round 2px);
  filter: brightness(2) saturate(0) blur(2px);
  opacity: 0.2;
}

/* ENTRADA: la vista se expande desde una línea horizontal en el centro */
.portal-enter-active {
  transition:
    clip-path 0.4s cubic-bezier(0, 0, 0.2, 1),
    filter 0.4s ease,
    opacity 0.3s ease;
  will-change: clip-path, filter;
}
.portal-enter-from {
  clip-path: inset(50% 0 50% 0 round 2px);
  filter: brightness(1.8) saturate(0) blur(1px);
  opacity: 0.3;
}
.portal-enter-to {
  clip-path: inset(0% 0 0% 0 round 0px);
  filter: brightness(1) saturate(1) blur(0px);
  opacity: 1;
}
</style>
