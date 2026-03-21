
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import SkillsView from '@/views/SkillsView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'


const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/proyectos', name: 'ProjectsView', component: ProjectsView },
  { path: '/habilidades', name: 'SkillsView', component: SkillsView },
  { path: '/sobre-mi', name: 'AboutView', component: AboutView },
  { path: '/contacto', name: 'ContactView', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
