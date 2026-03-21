<template>
  <nav  role="navigation" aria-label="Navegación principal">
    <!-- Desktop: vertical derecha -->
    <ul
    class="hidden md:flex flex-col items-center gap-6 fixed right-10 top-1/2 -translate-y-1/2 space-y-6"
    v-if="isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name">
        <button
          @click="navigate(item)"
          @mouseenter="hovered = item.name"
          @mouseleave="hovered = null"
          class="flex flex-col items-center gap-2"
          id="desktop-button"
          >
          <!-- ICONO -->
          <component
            :is="item.icon"
            :class="[
              'w-6 h-6 transition-all duration-300',
              shouldFloat(item) ? 'icon-float' : ''
            ]"
          />

          <!-- TEXTO -->
          <span class="text-xs">
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>

      <!-- Mobile/Tablet: sticky bottom -->
    <ul
    class="lg:hidden flex justify-around items-center fixed bottom-25 left-0 w-full py-2"
    v-if="!isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name" class="relative">
        <button
          @click="handleTap(item)"
          class="flex flex-col items-center"
          id="mobile-icon"
          >
          <component
            :is="item.icon"
            :class="[
              'w-6 h-6 transition-all',
              shouldFloat(item) ? 'icon-float' : ''
            ]"
          />
        </button>

        <!-- Tooltip -->
        <span
          v-if="tooltip === item.name"
          class="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded"
          >
          {{ item.label }}
        </span>
      </li>
    </ul>
  </nav>
</template>
<script setup>
  import { Rocket, Code, Fingerprint, CircleUser } from 'lucide-vue-next'
  import { useNavigation } from '@/composables/useNavigation'

  const {
    hovered,
    tooltip,
    isDesktop,
    navigate,
    handleTap,
    shouldFloat
  } = useNavigation()

  const menuItems = [
    { name: 'projects', label: 'Proyectos', icon: Rocket, route: 'ProjectsView' },
    { name: 'skills', label: 'Habilidades', icon: Code, route: 'SkillsView' },
    { name: 'aboutme', label: 'Sobre Mí', icon: Fingerprint, route: 'AboutView' },
    { name: 'contact', label: 'Contacto', icon: CircleUser, route: 'ContactView' }
  ]
</script>

<style scoped>
/* Animaciones y estilos generales */
#mobile-icon, #desktop-button{
  color: var(--color-text);
}

.icon-float {
  animation: float 1.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
