<template>
  <section class="project flex flex-col items-center justify-initial">
    <h1 class="text-3xl font-bold my-6! text-white">Proyectos</h1>
    <ProjectsCarousel v-if="projects.length > 0" :projects="projects" />
    <!-- Loader Fallback -->
    <div v-else class="flex flex-col items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-accent-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-400 animate-pulse text-sm">Cargando los mejores proyectos...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectsCarousel from '@/components/layout/ProjectsCarousel.vue'

const projects = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/assets/data/projects.json')
    if (!res.ok) {
      throw new Error(`Error al cargar projects.json: ${res.status}`)
    }
    const data = await res.json()

    // Map entries to array
    projects.value = Object.keys(data).map(key => ({
      key,
      ...data[key]
    }))
  } catch (err) {
    console.error('Error cargando los datos de proyectos:', err)
  }
})
</script>

<style scoped>
.project {
  width: 100%;
  color: var(--text-primary);
  min-height: calc(100dvh - 120px); /* Ajuste aproximado para el header */
}
</style>
