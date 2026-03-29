<template>
  <header role="banner" class="sticky top-0 left-0 flex justify-between items-center p-4">
    <IdentityLogo/>

      <ToggleLightMode />

    <NavigationMenu/>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleLightMode from '@/plugins/ToggleLightMode.vue';
import NavigationMenu from '../ui/NavigationMenu.vue';

const router = useRouter();

router.push({ name: 'HomeView' });


</script>

<style scoped>
header {
  background-color:transparent;
  color: var(--color-text);
}

</style>
