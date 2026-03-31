<template>
  <div
    class="identity
    flex items-center justify-center
    min-[400px]:m-0
    min-[720px]:ml-4"
    >

    <button
      class="flex items-baseline
      cursor-pointer
      glassmorphic
      transition-all duration-300 group"
      @click="goHome"
      aria-label="Ir a inicio"
    >
      <span
      class="text-[var(--color-terracota)]
      font-primary
      font-bold
      transition-colors duration-300
      text-[clamp(1.6rem,3vw,1.7rem)]
      neon">
        //
      </span>

      <span
      class=" text-[var(--color-smoke)]
      font-primary
      font-bold
      text-[clamp(1.6rem,3vw,1.8rem)]">
        ACMA
      </span>
    </button>

  </div>
</template>

<style scope>
  .identity button{
    padding: .5rem 1rem;
  }
</style>

<script setup>

const goHome = () => {
  const home = document.getElementById('HomeView');
  home?.scrollIntoView({ behavior: 'smooth' });
}
</script>
