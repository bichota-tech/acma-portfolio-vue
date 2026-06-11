<template>
  <div class="body-cardfame">
    <div class="carousel-wrapper-fame">
      <div
        class="carousel-fame"
        @touchstart="carousel.handleTouchStart"
        @touchend="carousel.handleTouchEnd"
        @mouseenter="carousel.handleMouseEnter"
        @mouseleave="carousel.handleMouseLeave"
      >
        <div
          v-for="(item, index) in items"
          :key="item.id"
          :class="['card-fame', `${carousel.getCardClass(index)}-fame`]"
          @click="handleCardClick(index, item)"
        >
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="card-link"
          >
            <video
              :src="item.video.src"
              autoplay
              loop
              muted
              playsinline
            ></video>
          </a>
        </div>
      </div>
    </div>

    <!-- Indicadores -->
    <div class="indicators">
      <div
        v-for="(item, index) in items"
        :key="`indicator-${item.id}`"
        :class="['indicator', { 'indicator-active': index === carousel.activeIndex }]"
        @click="carousel.goToCard(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCarousel } from '@/composables/useCarousel.js'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) =>
      Array.isArray(value) &&
      value.every(
        (item) =>
          item.id &&
          item.video &&
          item.video.src &&
          item.video.type &&
          item.link
      )
  },
  autoplayDuration: {
    type: Number,
    default: 8000
  },
  pauseOnHoverDelay: {
    type: Number,
    default: 2000
  }
})

const emits = defineEmits(['item-clicked'])

const itemsRef = ref(props.items)

// Actualizar cuando los items cambian
watch(
  () => props.items,
  (newItems) => {
    itemsRef.value = newItems
  }
)

// Usar la composable
const carousel = useCarousel(itemsRef, {
  autoplayDuration: props.autoplayDuration,
  pauseOnHoverDelay: props.pauseOnHoverDelay
})

// Manejador de click en cards
const handleCardClick = (index, item) => {
  // Solo permitir click si es la card activa
  if (index !== carousel.activeIndex.value) {
    // El click se bloquea, pero la navegación ocurre naturalmente para links
    emits('item-clicked', { index, item, allowed: false })
    return
  }

  emits('item-clicked', { index, item, allowed: true })
}
</script>

<style scoped>

.body-cardfame {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  cursor: default;
}

.carousel-wrapper-fame {
  width: 100%;
  height: 100vh;
  padding: 1rem;
  overflow: hidden;
  position: relative;
  perspective: 2000px;
}

.carousel-fame {
  position: relative;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-fame {
  position: absolute;
  padding: 0;
  width: 320px; /* Ajustado al tamaño del video */
  height: 640px;
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  transition: transform 0.8s ease, opacity 0.6s ease, filter 0.6s ease;
  filter: blur(2px);
  opacity: 0;
  z-index: 0;
}

@media (max-width: 768px) {
  .card-fame {
    width: 200px;
    height: 400px;
  }
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1);
  transition: filter 0.3s ease;
}

.card-fame.active-fame a:hover video,
.card-fame.active-fame video:hover {
  filter: brightness(0.8);
}

.card-fame.active-fame {
  transform: translateX(0px) translateZ(0px) rotateY(0deg) scale(1);
  filter: none;
  opacity: 1;
  z-index: 5;
  cursor: pointer;
}

.card-fame.active-fame:hover {
  transform: translateX(0px) translateZ(0px) rotateY(0deg) scale(1);
  filter: none;
  opacity: 1;
  z-index: 5;
}

.card-fame.left-fame {
  transform: translateX(-320px) translateZ(-150px) rotateY(35deg) scale(0.85);
  opacity: 1;
  z-index: 3;
}

.card-fame.right-fame {
  transform: translateX(320px) translateZ(-150px) rotateY(-35deg) scale(0.85);
  opacity: 1;
  z-index: 3;
}

@media (max-width: 768px) {
  .card-fame.left-fame {
    transform: translateX(-200px) translateZ(-150px) rotateY(35deg) scale(0.85);
  }

  .card-fame.right-fame {
    transform: translateX(200px) translateZ(-150px) rotateY(-35deg) scale(0.85);
  }
}

.card-fame.hidden-fame {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.5) translateZ(-500px);
  z-index: 0;
}

/* ============================================================================
   INDICADORES DEL CAROUSEL
   ============================================================================ */

.indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(46, 46, 46, 0.829);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.indicator:hover {
  background-color: rgba(70, 69, 69, 0.6);
  transform: scale(1.2);
}

.indicator-active {
  background-color: rgb(255, 28, 123);
  transform: scale(1.3);
  box-shadow: 0 0 10px rgb(255, 28, 123);
}
</style>
