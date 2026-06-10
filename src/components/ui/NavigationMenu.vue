<template>
  <nav role="navigation" aria-label="Navegación principal">
    <!-- Desktop: vertical derecha -->
    <ul id="desk"
    class="hidden md:flex flex-col items-center p-8 gap-8 fixed right-8 top-1/2 -translate-y-1/2 space-y-6 glassmorphic"
    v-if="isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name">
        <button
          @click="navigate(item)"
          @mouseenter="hovered = item.name"
          @mouseleave="hovered = null"
          class="flex flex-col items-center gap-2 cursor-pointer"
          id="desktop-btn"
          >
          <!-- ICONO -->
          <component
            :is="item.icon"
            :class="[
              'w-7 h-7 transition-all duration-300',
              shouldFloat(item) ? 'icon-float' : ''
            ]"
          />

          <!-- TEXTO -->
          <span class="text-label">
            {{ item.label }}
          </span>
        </button>
      </li>

    </ul>

      <!-- Mobile/Tablet: sticky bottom -->
    <ul id="mob"
    class="lg:hidden flex justify-around items-center flexWrap-nowrap fixed bottom-2 left-1/2 -translate-x-1/2 w-90 glassmorphic"
    v-if="!isDesktop"
    >
      <li v-for="item in menuItems" :key="item.name" class="relative">
        <button
          @click="handleTap(item)"
          class="flex flex-col items-center cursor-pointer"
          id="mobile-btn"
          >
          <component
            :is="item.icon"
            :class="[
              'w-6 h-6 transition-all mobileIcon',
              shouldFloat(item) ? 'icon-float' : ''
            ]"

          />
        </button>

        <!-- Tooltip -->
        <transition name="fade" >

          <span
          v-if="tooltip === item.name"
          class="text-label absolute whitespace-nowrap -top-15 left-1/2 -translate-x-1/2 text-md px-4 py-1 rounded"
          >
          {{ item.label }}
        </span>
      </transition>
        </li>
    </ul>
  </nav>
</template>
<script setup>
  import { Rocket, Code, Fingerprint, CircleUser, FileText } from 'lucide-vue-next'
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
    { name: 'contact', label: 'Contacto', icon: CircleUser, route: 'ContactView' },
    { name: 'resume', label: 'Currículum', icon: FileText, download:'/assets/docs/FrontendDev-Vue-Adalid.pdf' }

  ]
</script>

<style scoped>
  #desk, #mob{
    border-radius: 20px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }

  ul#desk{
    padding: 2rem .8rem;
  }

  ul#mob{
    padding: 1rem .6rem;
  }

  .text-label {
    font-size: clamp(1rem, 4vw, 1.25rem);
  }

  @media (min-width: 720px) {
    ul#mob{
      width: 80%;
      padding: 1.5rem .8rem;
      bottom:2%;
    }

    .mobileIcon{
      min-width: 38px;
      min-height: 38px;
    }

    .text-md{
      top: -6rem;
    }

  }

  #desktop-btn, #mobile-btn{
    color: var(--text-primary);
  }

  .text-md{
    color: var(--text-primary);
    padding: .2rem .5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--bg-tertiary);
  }

  .icon-float {
    animation: float 1.5s ease-in-out infinite;
  }


  @keyframes float {
    0%, 100% {
      transform: translateY(0);color: var(--accent);
    }
    50% { transform: translateY(-4px); }
  }

    /* Las clases de "active" controlan la duración y el tipo de curva (suavizado) */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  /* Estado inicial (cuando aparece) y estado final (cuando se va) */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    /* Mantenemos el -50% del centrado y bajamos 8px para el efecto de deslizamiento */
    transform: translateY(8px);
  }

  /* Estado cuando ya está visible (opcional, para asegurar el centrado) */
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

</style>
