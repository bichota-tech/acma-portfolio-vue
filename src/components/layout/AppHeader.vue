<template>
  <header role="banner" class="sticky top-0 left-0 flex items-center justify-between items-center px-6 py-2 w-full">
    <IdentityLogo/>

    <ToggleLightMode />

    <NavigationMenu/>
  </header>
</template>

<style scoped>
  header{
    padding: 1.5rem 3rem;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
  header{
    padding: 1rem;
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleLightMode from '@/plugins/ToggleLightMode.vue';
import NavigationMenu from '../ui/NavigationMenu.vue';

const router = useRouter();

router.push({ name: 'HomeView' });

</script>
