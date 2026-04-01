<!-- src/App.vue -->
<template>
  <ParticlesBackground />
    <!-- Header persistente -->
    <AppHeader />

    <!-- Contenido dinámico de la vista -->
    <main class="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
      <RouterView v-slot="{ Component }"> <Transition name="fade" mode="out-in"> <component :is="Component" /> </Transition> </RouterView>
    </main>

    <!-- Footer persistente -->
    <AppFooter />

</template>

<script setup>
import ParticlesBackground from './components/ui/ParticlesBackground.vue';
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

onMounted(() => {
  theme.applyTheme()
})

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

</script>

<style scoped>
/* Layout global */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  position: relative;
}

.section-stack {
  z-index: -1;
  height: 100vh;
  width: 100%;
  position: sticky;
  top: 0;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* El sticky top-0 hace que se queden "pegadas" mientras la siguiente sube */
}

main {
  flex: 1 0 auto;

}

/* Transición simple para cambios de vistas */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
