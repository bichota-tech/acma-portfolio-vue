<template>
  <header>
    <h1>//ACMA</h1>
    <nav>
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
import ToggleDarkMode from '@/components/ui/ToggleDarkMode.vue'
</script>