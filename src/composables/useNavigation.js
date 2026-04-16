import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

export function useNavigation() {
  const route = useRoute()
  const navStore = useNavigationStore()

  // Estado
  const hovered = ref(null)
  const tooltip = ref(null)
  const isDesktop = ref(false)

  // Responsive
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1024 // breakpoint lg de tailwind.config.js
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  // Navegación
  const navigate = (item) => {
    navStore.triggerNavigation(item.route)
    tooltip.value = null
  }

  // Mobile UX
  let tapTimeout = null

  const handleTap = (item) => {
    if (tooltip.value === item.name) {
      navigate(item)
    } else {
      tooltip.value = item.name
      clearTimeout(tapTimeout)
      tapTimeout = setTimeout(() => {
        tooltip.value = null
      }, 3500)
    }
  }

  // Estado visual
  const currentRouteName = computed(() => route.name)

  const shouldFloat = (item) => {
    return (
      currentRouteName.value === item.route ||
      hovered.value === item.name ||
      tooltip.value === item.name
    )
  }

  return {
    hovered,
    tooltip,
    isDesktop,
    navigate,
    handleTap,
    shouldFloat
  }
}
