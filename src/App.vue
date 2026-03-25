<!-- src/App.vue -->
<template>
  <ParticlesBackground />
    <!-- Header persistente -->
    <AppHeader />

    <!-- Contenido dinámico de la vista -->
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
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

<style>
/* Layout global */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  position: relative;
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
