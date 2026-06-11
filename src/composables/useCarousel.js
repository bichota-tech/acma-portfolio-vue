import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Composable para gestionar la lógica del carrusel 3D
 * Reutilizable en cualquier componente Vue
 */
export function useCarousel(itemsRef, options = {}) {
  // Configuración
  const autoplayDuration = options.autoplayDuration ?? 8000
  const pauseOnHoverDelay = options.pauseOnHoverDelay ?? 2000
  const swipeThreshold = options.swipeThreshold ?? 50
  const _transitionDuration = options.transitionDuration ?? 800

  // Estado del carrusel
  const currentIndex = ref(0)
  const isPaused = ref(false)
  const isTransitioning = ref(false)

  // Timers
  let autoplayTimer = null
  let hoverTimer = null

  // Estado del swipe
  let touchStartX = 0

  // Computed
  const totalItems = computed(() => itemsRef.value?.length ?? 0)

  const activeIndex = computed(() => currentIndex.value)

  const leftIndex = computed(() =>
    (currentIndex.value - 1 + totalItems.value) % totalItems.value
  )

  const rightIndex = computed(() =>
    (currentIndex.value + 1) % totalItems.value
  )

  // Método: obtener clase de estado de una card
  const getCardClass = (itemIndex) => {
    if (itemIndex === activeIndex.value) return 'active'
    if (itemIndex === leftIndex.value) return 'left'
    if (itemIndex === rightIndex.value) return 'right'
    return 'hidden'
  }

  // Método: actualizar índice actual
  const updateCarousel = (index) => {
    currentIndex.value =
      (index % totalItems.value + totalItems.value) % totalItems.value
    isTransitioning.value = false
  }

  // Método: ir a una card específica
  const goToCard = (index) => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    updateCarousel(index)
    restartAutoplay()
  }

  // Método: siguiente card
  const nextCard = () => {
    goToCard(currentIndex.value + 1)
  }

  // Método: card anterior
  const prevCard = () => {
    goToCard(currentIndex.value - 1)
  }

  // Autoplay
  const startAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer)

    autoplayTimer = setInterval(() => {
      if (!isPaused.value) {
        nextCard()
      }
    }, autoplayDuration)
  }

  const restartAutoplay = () => {
    startAutoplay()
  }

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
  }

  // Event Handlers
  const handleKeyboardEvent = (e) => {
    if (isTransitioning.value) return

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        nextCard()
        break
      case 'ArrowLeft':
        e.preventDefault()
        prevCard()
        break
      case 'Enter':
        // El componente manejará esto
        break
    }
  }

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (isTransitioning.value) return

    const touchEndX = e.changedTouches[0].clientX
    const difference = touchStartX - touchEndX

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        nextCard()
      } else {
        prevCard()
      }
    }
  }

  const handleMouseEnter = () => {
    isPaused.value = true
  }

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer)

    hoverTimer = setTimeout(() => {
      isPaused.value = false
    }, pauseOnHoverDelay)
  }

  // Lifecycle
  onMounted(() => {
    // Agregar event listeners globales
    document.addEventListener('keydown', handleKeyboardEvent)

    // Iniciar autoplay
    startAutoplay()
  })

  onUnmounted(() => {
    // Limpiar timers y listeners
    stopAutoplay()
    if (hoverTimer) clearTimeout(hoverTimer)
    document.removeEventListener('keydown', handleKeyboardEvent)
  })

  return {
    // State
    currentIndex,
    isPaused,
    isTransitioning,

    // Computed
    totalItems,
    activeIndex,
    leftIndex,
    rightIndex,

    // Methods
    getCardClass,
    goToCard,
    nextCard,
    prevCard,
    startAutoplay,
    stopAutoplay,
    updateCarousel,

    // Handlers
    handleTouchStart,
    handleTouchEnd,
    handleMouseEnter,
    handleMouseLeave
  }
}
