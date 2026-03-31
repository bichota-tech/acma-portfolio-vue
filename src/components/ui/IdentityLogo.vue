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
      bg-[var(--color-midnight-trans)]
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
    backdrop-filter: blur(4px) saturate(180%);
    -webkit-backdrop-filter: blur(4px) saturate(180%);
    border-radius: 30px;
    border: 1px solid rgba(245, 82, 57, 0.308);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  }
</style>

<script setup>

const goHome = () => {
  const home = document.getElementById('HomeView');
  home?.scrollIntoView({ behavior: 'smooth' });
}
</script>
