
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import SkillsView from '@/views/SkillsView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      title: 'Adalid | Frontend Developer & UI Designer',
      description: 'Desarrolladora Frontend y Diseñadora Web. Explora mi trabajo, proyectos y habilidades.',
      metaTags: [
        { name: 'description', content: 'Desarrolladora Frontend y Diseñadora Web. Explora mi trabajo, proyectos y habilidades.' },
        { property: 'og:title', content: 'Adalid | Frontend Developer & UX Designer' },
        { property: 'og:description', content: 'Desarrolladora Frontend y Diseñadora Web. Explora mi trabajo, proyectos y habilidades.' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  {
    path: '/proyectos',
    name: 'ProjectsView',
    component: ProjectsView,
    meta: {
      title: 'Proyectos | ACMA',
      description: 'Galería interactiva en 3D de proyectos frontend recientes, desarrollados con tecnologías modernas, optimización de rendimiento y accesibilidad.',
      metaTags: [
        { name: 'description', content: 'Galería interactiva en 3D de proyectos frontend recientes, desarrollados con tecnologías modernas, optimización de rendimiento y accesibilidad.' },
        { property: 'og:title', content: 'Proyectos | ACMA' },
        { property: 'og:description', content: 'Galería interactiva en 3D de proyectos frontend recientes, desarrollados con tecnologías modernas, optimización de rendimiento y accesibilidad.' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  {
    path: '/habilidades',
    name: 'SkillsView',
    component: SkillsView,
    meta: {
      title: 'Habilidades y Tecnologías | ACMA',
      description: 'Conocimientos técnicos y habilidades en desarrollo frontend, maquetación, WordPress, control de versiones Git y diseño UI',
      metaTags: [
        { name: 'description', content: 'Conocimientos técnicos y habilidades en desarrollo frontend, maquetación, WordPress, control de versiones Git y diseño UI' },
        { property: 'og:title', content: 'Habilidades y Tecnologías | ACMA' },
        { property: 'og:description', content: 'Conocimientos técnicos y habilidades en desarrollo frontend, maquetación, WordPress, control de versiones Git y diseño UI' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  {
    path: '/sobre-mi',
    name: 'AboutView',
    component: AboutView,
    meta: {
      title: 'Sobre Mí | Adalid',
      description: 'Conoce mi trayectoria profesional como desarrollador frontend, mi filosofía de diseño centrada en el usuario y mi enfoque hacia las mejores prácticas web.',
      metaTags: [
        { name: 'description', content: 'Conoce mi trayectoria profesional como desarrolladora frontend, mi filosofía de diseño centrada en el usuario y mi enfoque hacia las mejores prácticas web.' },
        { property: 'og:title', content: 'Sobre Mí | Adalid Martínez Álvarez' },
        { property: 'og:description', content: 'Conoce mi trayectoria profesional como desarrolladora frontend, mi filosofía de diseño centrada en el usuario y mi enfoque hacia las mejores prácticas web.' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  {
    path: '/contacto',
    name: 'ContactView',
    component: ContactView,
    meta: {
      title: 'Contacto | Adalid',
      description: 'Ponte en contacto conmigo para colaborar en proyectos de desarrollo web frontend o diseño de interfaces de usuario UX/UI. ¡Hablemos!',
      metaTags: [
        { name: 'description', content: 'Ponte en contacto conmigo para colaborar en proyectos de desarrollo web frontend o diseño de interfaces de usuario UX/UI. ¡Hablemos!' },
        { property: 'og:title', content: 'Contacto | Adalid' },
        { property: 'og:description', content: 'Ponte en contacto conmigo para colaborar en proyectos de desarrollo web frontend o diseño de interfaces de usuario UX/UI. ¡Hablemos!' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to update document titles and SEO meta tags dynamically
router.beforeEach((to, from, next) => {
  // Update document title
  const title = to.meta.title || 'Adalid Martínez Álvarez | Portfolio'
  document.title = title

  // Update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]')
  const descriptionText = to.meta.description || 'Portfolio profesional de Adalid Martínez Álvarez (ACMA), Desarrollador Frontend y Diseñador UX/UI.'

  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', descriptionText)
  } else {
    descriptionMeta = document.createElement('meta')
    descriptionMeta.setAttribute('name', 'description')
    descriptionMeta.setAttribute('content', descriptionText)
    document.head.appendChild(descriptionMeta)
  }

  // Update dynamic Open Graph and other meta tags
  if (to.meta.metaTags && Array.isArray(to.meta.metaTags)) {
    // Remove previous dynamic tags
    const dynamicMetas = document.querySelectorAll('meta[data-dynamic="true"]')
    dynamicMetas.forEach(el => el.parentNode.removeChild(el))

    // Add new dynamic tags
    to.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta')
      tag.setAttribute('data-dynamic', 'true')
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })
      document.head.appendChild(tag)
    })
  }

  next()
})

export default router
