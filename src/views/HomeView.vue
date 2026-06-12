<template>
  <section class="home view-section flex flex-col items-center justify-center p-4 lg:px-8 gap-12 w-100%">
    <div class="left-container w-full lg:w-1/2 flex flex-col items-center justify-center">
      <h1 class="hero-title ">
        <span class="line-ingeniera-bloque">
          <span class="letra-capitular">I</span>
            <span class="palabras-apiladas">
            <span>ngeniera</span>
            <span>nformática</span>
          </span>
        </span>
        <span class="line-frontend">Frontend Developer</span>
        <span class="line-ui">
          <span class="neon">/</span>
          UI Designer
        </span>
      </h1>
    </div>

    <div class="cta-container w-full lg:w-1/2 gap-4 flex flex-col items-center justify-center my-6">
      <button
        type="button"
        ref="btnProjects"
        @click="navigateToProjects"
        class="cta-btn"
      >
        <span class="cta-btn__text">Explora mis proyectos</span>
      </button>
      <button
        type="button"
        ref="btnContact"
        @click="navigateToContact"
        class="cta-btn"
      >
        <span class="cta-btn__text">Contactame!</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const router = useRouter();
const btnProjects = ref(null);
const btnContact  = ref(null);

const navigateToProjects = () => router.push('/proyectos');
const navigateToContact  = () => router.push('/contacto');

/* ── Magnetic Effect ── */
const MAGNETIC_RADIUS   = 200;   // px — activation distance
const MAGNETIC_STRENGTH = 0.15; // 0-1 — fraction of offset applied

function setupMagnet(el) {
  if (!el) return () => {};

  let rafId = null;

  const onMove = (e) => {
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d  = Math.hypot(dx, dy);

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (d < MAGNETIC_RADIUS) {
        const pull = (1 - d / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
        el.style.setProperty('--mag-x', `${dx * pull}px`);
        el.style.setProperty('--mag-y', `${dy * pull}px`);
      } else {
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
      }
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafId);
    el.style.setProperty('--mag-x', '0px');
    el.style.setProperty('--mag-y', '0px');
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  el.addEventListener('mouseleave', onLeave);

  return () => {
    window.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(rafId);
  };
}

let cleanups = [];

onMounted(() => {
  cleanups = [
    setupMagnet(btnProjects.value),
    setupMagnet(btnContact.value),
  ];
});

onUnmounted(() => cleanups.forEach(fn => fn()));
</script>

<style scoped>
.home {
  color: var(--text-primary);

  /* Expand to fill all available space inside <main> so the content
     centers within the viewport. <main> already has flex:1, and #app
     is a flex-column — this makes the chain complete. */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Fallback: at minimum, take up the viewport minus a rough header height */
  min-height: calc(100dvh - 6rem);
}

@media screen and (min-width: 820px) {
  .home {
    flex-direction: row;
    gap: 2rem;
  }
  .cta-container {
    flex-direction: row;
    align-self: stretch;
  }


}

/* ── Hero Title ── */
.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1;
  letter-spacing: 0.02em;
  padding-left: 10px;

}

/* ── Shared "I" block ── */
.line-ingeniera-bloque {
  display: flex;
  flex-direction: row;
  align-items: center;   /* vertically center the I against the two lines */
  line-height: 1;
}

/* The giant shared "I" */
.letra-capitular {
  font-size: 2em;         /* 2× the stacked word size → spans both lines  */
  line-height: 1;
  margin-right: 0.05em;  /* tight kerning between I and the rest           */
  display: block;
  /* Optical alignment: pull it up a hair so cap-height aligns perfectly */
  transform: translateY(-0.01em);
}

/* The two stacked suffixes "ngeniera" / "nformática" */
.palabras-apiladas {
  display: flex;
  flex-direction: column;
  font-size: 0.75em;       /* smaller → together they equal the I's height  */
  line-height: 1.15;
}

.line-frontend{
  width: 100%;
  text-align: center;
}

/* Second line UI Designer */
.line-ui {
  font-size: 0.75em;
  margin-top: 0.15em;
}

/* ── CTA Button ── */
.cta-btn {
  --mag-x: 0px;
  --mag-y: 0px;

  position: relative;
  overflow: hidden;
  isolation: isolate;

  padding: 0.85rem 2.25rem;
  border: 2px solid var(--color-fiery-terracotta-500);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--text-primary);

  font-family: var(--font-secondary);
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  letter-spacing: 0.04em;
  cursor: pointer;

  /* Magnetic translation (smooth spring-like ease) */
  transform: translate(var(--mag-x), var(--mag-y));
  transition:
    transform  0.35s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.4s  cubic-bezier(0.23, 1, 0.32, 1);

  will-change: transform;
}


/* Fill layer — slides in from the LEFT on hover */
.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--color-fiery-terracotta-500);

  /* Start hidden to the left */
  transform: translateX(-101%);
  transition: transform 0.48s cubic-bezier(0.76, 0, 0.24, 1);
}

/* Text sits above the fill layer */
.cta-btn__text {
  position: relative;
  z-index: 1;
  /* Smooth color swap as fill arrives */
  transition: color 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}

/* ── Hover state ── */
.cta-btn:hover::before {
  transform: translateX(0);
}

/* Dark theme: white text on terracota fill */
[data-theme="dark"] .cta-btn:hover .cta-btn__text {
  color: var(--color-fiery-terracotta-50);
}

[data-theme="dark"] .cta-btn:hover {
  box-shadow: 0 0 22px rgba(242, 43, 13, 0.40);
}

/* Light theme: near-white text on terracota fill */
[data-theme="light"] .cta-btn:hover .cta-btn__text {
  color: var(--color-fiery-terracotta-0);
}

[data-theme="light"] .cta-btn:hover {
  box-shadow: 0 0 18px rgba(242, 43, 13, 0.28);
}

/* ── Focus ring for accessibility ── */
.cta-btn:focus-visible {
  outline: 2px solid var(--color-fiery-terracotta-400);
  outline-offset: 3px;
}
</style>
