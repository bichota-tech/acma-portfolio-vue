<template>
  <header role="banner">
    <IdentityLogo />
    <ToggleLightMode />
    <NavigationMenu />
  </header>
</template>

<script setup>
import IdentityLogo from '@/components/ui/IdentityLogo.vue'
import ToggleLightMode from '@/plugins/ToggleLightMode.vue'
import NavigationMenu from '../ui/NavigationMenu.vue'
</script>
