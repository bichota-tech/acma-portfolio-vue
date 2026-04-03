<template>
  <div class="identity flex items-center justify-center">
    <button
      class="logo-btn flex items-baseline cursor-pointer"
      @click="goHome"
      aria-label="Ir a inicio"
    >
      <span class="font-primary font-bold neon text-[clamp(1.6rem,3vw,1.7rem)]">
        //
      </span>
      <span class="text-[var(--text-primary)] font-primary font-bold text-[clamp(1.6rem,3vw,1.8rem)]">
        ACMA
      </span>
    </button>
  </div>
</template>

<style scoped>
.identity {
  position: fixed;
  top: .5rem;
  left: 2rem;
  z-index: 200;
}

.logo-btn {
  padding: .5rem 1rem;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: opacity 0.2s ease;
}


@media (max-width: 768px) {
  .identity {
    top: 0.8rem;
    left: 1rem;
  }
}
</style>

<script setup>
import { useNavigationStore } from '@/stores/navigation'

const navStore = useNavigationStore()

const goHome = () => {
  navStore.triggerNavigation('HomeView')
}
</script>
