<template>
  <header>
    <nav  role="navigation" aria-label="Navegación principal">
      <div class="logo">
                <a class="navbar-brand-symbol neon" href="#inicio" aria-label="ACMA - Ir a inicio">//</a>
                <a class="navbar-brand" href="#inicio">ACMA</a>
            </div>
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