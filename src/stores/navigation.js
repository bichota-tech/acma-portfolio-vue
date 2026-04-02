import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const targetRoute = ref(null)

  // Un solo punto de entrada para toda la navegación de la app
  function triggerNavigation(routeName) {
    // Evitar navegar a la misma ruta
    targetRoute.value = routeName
  }

  return { targetRoute, triggerNavigation }
})
