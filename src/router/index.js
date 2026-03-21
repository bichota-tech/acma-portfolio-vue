
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import SkillsView from '@/views/SkillsView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/proyectos', name: 'Proyectos', component: ProjectsView },
  { path: '/habilidades', name: 'Habilidades', component: SkillsView },
  { path: '/sobre-mi', name: 'SobreMi', component: AboutView },
  { path: '/contacto', name: 'Contacto', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
