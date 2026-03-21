import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useNavigation() {
  const router = useRouter()
  const route = useRoute()

  // Estado
  const hovered = ref(null)
  const tooltip = ref(null)
  const isDesktop = ref(false)

  // Responsive
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 820
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
    router.push({ name: item.route })
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
      }, 2000)
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
