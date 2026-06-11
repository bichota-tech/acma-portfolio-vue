<template>
  <div class="bodycardfame min-h-[600px] flex flex-col justify-center items-center w-full relative select-none">

    <!-- Carousel Wrapper -->
    <div class="carousel-wrapperfame w-full h-[480px] md:h-[520px] lg:h-[580px] overflow-hidden relative" style="perspective: 2000px;">
      <div
        ref="carouselRef"
        class="carouselfame relative h-full w-full flex justify-center items-center"
        style="transform-style: preserve-3d;"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Project Cards -->
        <div
          v-for="(project, index) in projects"
          :key="project.key"
          class="cardfame absolute w-[280px] sm:w-[320px] md:w-[360px] h-[400px] md:h-[450px] lg:h-[500px] border-radius-[35px] overflow-hidden transition-all duration-800 ease-in-out"
          :class="getCardClass(index)"
          @click="handleCardClick($event, index)"
        >
          <!-- Video Demo -->
          <video
            autoplay
            loop
            muted
            playsinline
            class="w-full h-full object-contain filter brightness-[0.85] hover:brightness-[1.05] transition-all duration-300 cursor-pointer"
          >
            <source :src="project.videoSrc" type="video/webm">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="indicators flex justify-center items-center gap-3 my-4 h-auto">
      <button
        v-for="(project, index) in projects"
        :key="'ind-' + project.key"
        class="indicator w-3 h-3 rounded-full cursor-pointer transition-all duration-300 border-none outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
        :class="index === currentIndex ? 'bg-accent-secondary scale-120 shadow-[0_0_10px_var(--color-accent-secondary)]' : 'bg-gray-700/80 hover:bg-accent-secondary/50 hover:scale-120'"
        :aria-label="'Ver proyecto ' + project.title"
        :aria-current="index === currentIndex ? 'true' : 'false'"
        @click="goToCard(index)"
      />
    </div>

    <!-- Detail Modal -->
    <div
      v-if="isModalOpen || isClosing"
      class="project-modal fixed inset-0 z-[1000] flex flex-col justify-center items-center"
      :class="{ 'closing': isClosing }"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!isModalOpen"
      aria-labelledby="modal-title"
    >
      <!-- Backdrop Overlay with Glassmorphism -->
      <div
        class="project-modal-overlay absolute inset-0 backdrop-blur-md bg-black/60 transition-opacity duration-300"
        @click="closeModal"
      />

      <!-- Modal Content Card -->
      <div
        ref="modalContentRef"
        class="project-modal-content glassmorphic relative max-w-[500px] w-[90%] mx-4 text-[var(--text-primary)] rounded-[30px] p-6! md:p-8! pt-10! md:pt-12! max-h-[85vh] overflow-y-auto shadow-[0_8px_32px_rgba(242,43,13,0.3)] transform transition-all duration-300"
        :class="isClosing ? 'animate-modal-out' : 'animate-modal-in'"
        tabindex="-1"
      >
        <!-- Close Button -->
        <button
          ref="closeBtnRef"
          class="project-modal-close absolute top-4 right-5 bg-transparent border-none text-2xl text-[var(--text-secondary)] hover:text-[var(--accent)] font-bold cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-[10px] px-3! py-1.4!"
          aria-label="Cerrar modal de detalles"
          @click="closeModal"
        >
          &times;
        </button>

        <!-- Project Title -->
        <h2 id="modal-title" class="text-2xl md:text-3xl font-bold text-[var(--accent)] mt-2! mb-5! text-center">
          {{ selectedProject?.title }}
        </h2>

        <!-- Description -->
        <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium mb-6! text-center">
          {{ selectedProject?.description }}
        </p>

        <!-- Technologies Tags -->
        <ul class="flex flex-wrap justify-center gap-2 mb-6! p-0 list-none">
          <li
            v-for="tech in selectedProject?.technologies"
            :key="tech"
            class="bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold text-xs md:text-sm px-3! py-1.5! rounded-xl! border border-[var(--accent)]/20 shadow-sm"
          >
            {{ tech }}
          </li>
        </ul>

        <!-- External Link Button -->
        <div class="flex justify-center mt-2">
          <a
            :href="selectedProject?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-8! py-3! rounded-full! font-bold text-sm tracking-wider uppercase bg-[var(--accent)] hover:bg-[var(--color-fiery-terracotta-600)] text-white shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 transform hover:-translate-y-0.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Ver proyecto
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCarousel } from '@/composables/useCarousel.js';

const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  autoplayInterval: {
    type: Number,
    default: 8000
  }
});

const {
  currentIndex,
  isModalOpen,
  isClosing,
  selectedProject,
  closeBtnRef,
  getCardClass,
  goToCard,
  handleMouseEnter,
  handleMouseLeave,
  handleCardClick,
  closeModal,
  handleTouchStart,
  handleTouchEnd
} = useCarousel(computed(() => props.projects), {
  autoplay: computed(() => props.autoplay),
  autoplayInterval: computed(() => props.autoplayInterval)
});
</script>

<style scoped>
/* Custom 3D Carousel & 3D styling */
.bodycardfame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: default;
}

.carousel-wrapperfame {
  width: 100%;
  overflow: hidden;
  position: relative;
  perspective: 2000px;
  padding-block: 1rem;
}

.carouselfame {
  position: relative;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardfame {
  position: absolute;
  padding: 0;
  height: 100%;
  border-radius: 35px;
  overflow: hidden;
  transition: transform 0.8s ease, opacity 0.6s ease, filter 0.6s ease;
  filter: blur(2px);
  opacity: 0;
  z-index: 0;
}

@media (max-width: 800px) {
  .carousel-wrapperfame {
    height: 70vh;
  }
  .cardfame {
    height: 450px;
    border-radius: 30px;
  }
}

@media (max-width: 440px) {
  .bodycardfame {
    margin-top: 0;
  }
  .carousel-wrapperfame {
    height: 70vh;
  }
}

.cardfame.activefame {
  transform: translateX(0px) translateZ(0px) rotateY(0deg) scale(1);
  filter: none;
  opacity: 1;
  z-index: 5;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.cardfame.activefame:hover {
  transform: translateX(0px) translateZ(0px) rotateY(0deg) scale(1.03);
}

.cardfame.leftfame {
  transform: translateX(-350px) translateZ(-150px) rotateY(35deg) scale(0.85);
  opacity: 1;
  z-index: 3;
}

.cardfame.rightfame {
  transform: translateX(350px) translateZ(-150px) rotateY(-35deg) scale(0.85);
  opacity: 1;
  z-index: 3;
}

@media (max-width: 1024px) {
  .cardfame.leftfame {
    transform: translateX(-280px) translateZ(-150px) rotateY(35deg) scale(0.85);
    opacity: 1;
    z-index: 3;
  }
  .cardfame.rightfame {
    transform: translateX(280px) translateZ(-150px) rotateY(-35deg) scale(0.85);
    opacity: 1;
    z-index: 3;
  }
}

@media (max-width: 440px) {
  .cardfame.leftfame {
    transform: translateX(-200px) translateZ(-150px) rotateY(35deg) scale(0.85);
    opacity: 1;
    z-index: 3;
  }
  .cardfame.rightfame {
    transform: translateX(200px) translateZ(-150px) rotateY(-35deg) scale(0.85);
    opacity: 1;
    z-index: 3;
  }
}

.cardfame.hiddenfame {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.5) translateZ(-500px);
  z-index: 0;
}

/* Custom animations for modal content */
.animate-modal-in {
  animation: modalIn 0.3s ease-out forwards;
}

.animate-modal-out {
  animation: modalOut 0.3s ease-in forwards;
}

@keyframes modalIn {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes modalOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(40px);
    opacity: 0;
  }
}
</style>
