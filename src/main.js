
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css' // Importa el archivo CSS principal que contiene los estilos globales de la aplicación

const app = createApp(App) // Crea la instancia de la aplicación Vue
app.use(createPinia()) // Configura Pinia como el sistema de gestión de estado para la aplicación
app.use(router) // Configura Vue Router para manejar la navegación entre vistas en la aplicación

// Monta la aplicación en el index con id 'app'
app.mount('#app')

// Aplica el theme inicial
import { useThemeStore } from './stores/theme.js'
const themeStore = useThemeStore()
if (themeStore.isDark) {
    document.body.classList.add('dark-mode')
}

