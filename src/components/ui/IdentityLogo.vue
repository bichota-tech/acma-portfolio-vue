<style scoped>
/* Títulos compactos y "arquitectónicos" */
.logo{
  display: flex;
  justify-content: center;
  text-align: left;
  gap: 0.1rem;
  font-family: var(--font-primary);
  font-weight: var(--font-weight-bold);
}

.logo-text {
  color: var(--color-smoke);
  line-height: 1.2;
  font-size: clamp(1.5rem, 5vw, 3rem);
}

/* Utilidades de Marca */
.marca-acento {
  color: var(--color-terracota);
  line-height: 1.2;
  font-size: clamp(1.2rem, 5vw, 2.5rem);
}

.texto-apoyo {
  color: var(--color-terracota);
}
</style>

<template>
  <div class="logo">
    <span class="marca-acento">//</span>
    <span class="logo-text">ACMA</span>
  </div>
  <p class="texto-apoyo">Desarrollo y Diseño</p>
</template>

