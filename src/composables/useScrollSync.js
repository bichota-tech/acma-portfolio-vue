import { onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useScrollSync(containerRef) {
  const router = useRouter()
  const route = useRoute()

  let observer = null
  let isManualScrolling = false

  // Sincronizar Ruta -> Scroll
  const scrollToSection = (sectionId, smooth = true) => {
    if (sectionId === 'HomeView') return

    const element = document.getElementById(sectionId)
    if (element) {
      isManualScrolling = true
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      
      setTimeout(() => {
        isManualScrolling = false
      }, 800)
    }
  }

  const initObserver = () => {
    if (!containerRef.value) return
    
    // Si ya existe, desconectamos el antíguo
    if (observer) observer.disconnect()

    const options = {
      root: containerRef.value,
      threshold: 0.51, 
    }

    observer = new IntersectionObserver((entries) => {
      if (isManualScrolling) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (route.name !== sectionId && sectionId !== 'HomeView') {
             router.replace({ name: sectionId }).catch(() => {})
          }
        }
      })
    }, options)

    const sections = containerRef.value.querySelectorAll('.section-stack')
    sections.forEach((section) => observer.observe(section))
  }

  // En lugar de solo onMounted, vigilamos activamente el ref del contenedor
  // Esto arregla el bug cuando cambiamos desde HomeView y el contenedor se vuelve a montar.
  watch(() => containerRef.value, (newVal) => {
    if (newVal) {
      // Usamos nextTick para dar tiempo a que los section items se rendericen
      nextTick(() => {
        initObserver()
        if (route.name && route.name !== 'HomeView') {
          scrollToSection(route.name, false)
        }
      })
    } else {
      if (observer) observer.disconnect()
    }
  }, { immediate: true })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return {
    scrollToSection
  }
}
