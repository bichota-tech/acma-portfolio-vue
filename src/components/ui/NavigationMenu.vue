<template>
  <nav role="navigation" aria-label="Navegación principal">
    <!-- Desktop: vertical derecha -->
    <ul id="desk"
    class="hidden md:flex flex-col items-center p-8 gap-10 fixed right-8 top-1/2 -translate-y-1/2 space-y-6 glassmorphic"
    v-if="isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name">
        <button
          @click="navigate(item)"
          @mouseenter="hovered = item.name"
          @mouseleave="hovered = null"
          class="flex flex-col items-center gap-2"
          id="desktop-btn"
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
    <ul id="mob"
    class="lg:hidden flex justify-around items-center fixed bottom-15 left-1/2 -translate-x-1/2 w-90 glassmorphic"
    v-if="!isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name" class="relative">
        <button
          @click="handleTap(item)"
          class="flex flex-col items-center"
          id="mobile-btn"
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
          class="absolute -top-15 left-1/2 -translate-x-1/2 text-md px-4 py-1 rounded"
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
    shouldFloat,
  } = useNavigation()

  const menuItems = [
    { name: 'projects', label: 'Proyectos', icon: Rocket, route: 'ProjectsView' },
    { name: 'skills', label: 'Habilidades', icon: Code, route: 'SkillsView' },
    { name: 'aboutme', label: 'Sobre Mí', icon: Fingerprint, route: 'AboutView' },
    { name: 'contact', label: 'Contacto', icon: CircleUser, route: 'ContactView' }
  ]
</script>

<style scoped>

  ul#desk{
    padding: 2rem .8rem;
  }

  ul#mob{
    padding: 1rem .6rem;
  }

  .text-xs, .text-md{
    color: var(--color-text);
  }

  .icon-float {
    animation: float 1.5s ease-in-out infinite;
  }


  @keyframes float {
    0%, 100% {
      transform: translateY(0);color: var(--color-terracota-shine);
    }
    50% { transform: translateY(-4px); }
  }
</style>
