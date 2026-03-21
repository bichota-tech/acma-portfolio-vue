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
    isDesktop.value = window.innerWidth >= 768 // breakpoint md de Tailwind
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
    console.log('Navegando a:', item.route)
    router.push({ name: item.route }).catch(err => console.log(err)) // Evitar error al hacer clic en la ruta actual
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
