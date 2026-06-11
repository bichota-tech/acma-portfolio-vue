<template>
  <section class="project view-section flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6 text-white">Proyectos</h1>
    <App3dCarousel :items="carouselItems" />
  </section>
</template>

<script setup>
import App3dCarousel from '@/components/layout/App3dCarousel.vue'

const carouselItems = [
  {
    id: 1,
    video: {
      src: '/videos/excursionescartas.webm',
      type: 'video/webm'
    },
    link: 'https://github.com'
  },
  {
    id: 2,
    video: {
      src: '/videos/hevca_prueba.webm',
      type: 'video/webm'
    },
    link: 'https://github.com'
  },
  {
    id: 3,
    video: {
      src: '/videos/iPhone-13-PRO-hidraulica.cotos.es.webm',
      type: 'video/webm'
    },
    link: 'https://github.com'
  },
  {
    id: 4,
    video: {
      src: '/videos/iPhone-13-PRO-www.limpiezasvioletayverde.com.webm',
      type: 'video/webm'
    },
    link: 'https://github.com'
  }
]
</script>

<style scoped>
.project {
  color: var(--text-primary);
  min-height: calc(100vh - 80px); /* Ajuste aproximado para el header */
}
</style>
