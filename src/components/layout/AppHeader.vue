<template>
  <header role="banner">
    <IdentityLogo/>
    <nav  role="navigation" aria-label="Navegación principal">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/proyectos">Proyectos</router-link></li>
        <li><router-link to="/habilidades">Habilidades</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
    <ToggleDarkMode />
  </header>
</template>

<script setup>
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleDarkMode from '@/plugins/ToggleDarkMode.vue'
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
}
</style>
