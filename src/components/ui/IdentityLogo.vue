<style scoped>
/* Títulos compactos y "arquitectónicos" */

.brand{
  display: block;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: .8rem 1.5rem;
}

@media (min-width: 400px) {
  .identity{
    margin: 0;
  }
  .brand{
    width: 70px;
    height: 70px;
  }
}

@media (min-width: 720px) {
  .identity{
    margin-left: 1rem;
  }
  .brand{
    width: 80px;
    height: 80px;
  }
}
.logo-svg{
  width: 100%;
  height: 100%;
}

.logo-text{
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 120px;
}

</style>

<template>
  <div class="identity flex items-center justify-center">
    <button class="brand" @click="goHome" aria-label="Ir a inicio">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo-svg">
        <circle cx="256" cy="256" r="256" fill="#0A1128"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
         class="logo-text">
          <tspan fill="#f55139" class="neon">//</tspan>
          <tspan fill="#F4F4F9">ACMA</tspan>
        </text>
      </svg>

    </button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'HomeView' })
}
</script>
