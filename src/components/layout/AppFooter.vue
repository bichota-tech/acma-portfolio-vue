<template>
  <footer role="contentinfo" class="flex justify-center">
    <p>&copy; 2026 Mi Portfolio. Todos los derechos reservados.</p>
  </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--color-midnight);

}
@media (max-width: 768px) {
  footer{
    padding-bottom: 6rem;
  }
}
footer p {
  margin: 0;
  color: var(--color-smoke);
}
</style>
