<template>
  <header role="banner" class="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2">
    <IdentityLogo/>

      <ToggleDarkMode />

    <NavigationMenu/>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleDarkMode from '@/plugins/ToggleDarkMode.vue'
import NavigationMenu from '../ui/NavigationMenu.vue';

const router = useRouter();

router.push({ name: 'HomeView' });


</script>

<style scoped>
header {
  padding: 1rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  z-index: 1000;
}
</style>
