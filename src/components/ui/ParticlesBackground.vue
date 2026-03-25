<template>
    <vue-particles
      id="tsparticles"
      :options="particlesOptions"
    />
</template>

<script setup>

import { reactive } from 'vue';

const particlesOptions = reactive({
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
    },
    number: {
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
});

</script>

<style scoped>
#particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

:deep(#tsparticles) {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
