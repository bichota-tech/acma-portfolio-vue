<template>
  <header role="banner" class="sticky top-0 left-0 flex justify-between items-center p-4">
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
  color: var(--color-text);
}

</style>
