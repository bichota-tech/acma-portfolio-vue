import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useCarousel(projectsRef, options = {}) {
  // Option defaults/refs
  const autoplay = options.autoplay ?? ref(true);
  const autoplayInterval = options.autoplayInterval ?? ref(8000);

  const currentIndex = ref(0);
  const isTransitioning = ref(false);
  const isPaused = ref(false);
  const isModalOpen = ref(false);
  const isClosing = ref(false);
  const selectedProject = ref(null);

  const touchStartX = ref(0);
  const closeBtnRef = ref(null);

  let autoplayTimer = null;
  let hoverResumeTimer = null;

  // Determine classes for 3D layout based on index relative to active card
  const getCardClass = (index) => {
    const total = projectsRef.value?.length ?? 0;
    if (total === 0) return 'hiddenfame';

    const activeIdx = currentIndex.value;
    const leftIdx = (activeIdx - 1 + total) % total;
    const rightIdx = (activeIdx + 1) % total;

    if (index === activeIdx) return 'activefame';
    if (index === leftIdx) return 'leftfame';
    if (index === rightIdx) return 'rightfame';
    return 'hiddenfame';
  };

  // Navigation
  const goToCard = (index) => {
    if (isTransitioning.value) return;

    isTransitioning.value = true;
    const total = projectsRef.value?.length ?? 0;
    if (total === 0) return;
    currentIndex.value = (index % total + total) % total;

    // Clear transition lock after standard 800ms animation duration
    setTimeout(() => {
      isTransitioning.value = false;
    }, 800);

    restartAutoplay();
  };

  const nextCard = () => {
    goToCard(currentIndex.value + 1);
  };

  const prevCard = () => {
    goToCard(currentIndex.value - 1);
  };

  // Autoplay triggers
  const startAutoplay = () => {
    if (!autoplay.value) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isPaused.value && !isModalOpen.value) {
        nextCard();
      }
    }, autoplayInterval.value);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const restartAutoplay = () => {
    startAutoplay();
  };

  // Hover controls
  const handleMouseEnter = () => {
    if (hoverResumeTimer) clearTimeout(hoverResumeTimer);
    isPaused.value = true;
  };

  const handleMouseLeave = () => {
    // Resume autoplay 2 seconds after cursor leaves, matching vanilla implementation
    hoverResumeTimer = setTimeout(() => {
      isPaused.value = false;
    }, 2000);
  };

  // Card click (only active card opens modal, others slide in)
  const handleCardClick = (event, index) => {
    if (index !== currentIndex.value) {
      event.preventDefault();
      goToCard(index);
      return;
    }

    const project = projectsRef.value?.[index];
    if (project) {
      openModal(project);
    }
  };

  // Modal actions
  const openModal = (project) => {
    selectedProject.value = project;
    isModalOpen.value = true;
    isPaused.value = true;
    stopAutoplay();
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Manage accessibility focus
    nextTick(() => {
      if (closeBtnRef.value) {
        closeBtnRef.value.focus();
      }
    });
  };

  const closeModal = () => {
    if (isClosing.value) return;
    isClosing.value = true;

    // Match the 300ms transition of the slide-out animation
    setTimeout(() => {
      isModalOpen.value = false;
      isClosing.value = false;
      selectedProject.value = null;
      document.body.style.overflow = '';

      // Resume autoplay after 2 seconds
      setTimeout(() => {
        isPaused.value = false;
        startAutoplay();
      }, 2000);
    }, 300);
  };

  // Touch Gestures (Swipe)
  const handleTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (isTransitioning.value) return;

    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX.value - touchEndX;
    const threshold = 50; // swipe threshold in pixels

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
  };

  // Keyboard handler
  const handleKeyDown = (event) => {
    if (isTransitioning.value) return;

    if (isModalOpen.value) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    } else {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          nextCard();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevCard();
          break;
        case 'Enter': {
          // If focusing active card, open modal
          event.preventDefault();
          const activeProj = projectsRef.value?.[currentIndex.value];
          if (activeProj) {
            openModal(activeProj);
          }
          break;
        }
      }
    }
  };

  // Lifecycle
  onMounted(() => {
    startAutoplay();
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    stopAutoplay();
    if (hoverResumeTimer) clearTimeout(hoverResumeTimer);
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
  });

  return {
    currentIndex,
    isTransitioning,
    isPaused,
    isModalOpen,
    isClosing,
    selectedProject,
    closeBtnRef,
    
    getCardClass,
    goToCard,
    nextCard,
    prevCard,
    handleMouseEnter,
    handleMouseLeave,
    handleCardClick,
    openModal,
    closeModal,
    handleTouchStart,
    handleTouchEnd
  };
}
