
import { createApp } from 'vue';
import App from './App.vue';
import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';
import { createPinia } from 'pinia';
import './assets/main.css';
import router from './router';

const app = createApp(App) // Crea la instancia de la aplicación Vue

app.use(Particles, {
    init: async (engine) => {
        // Inicializa el motor de partículas
        await loadSlim(engine);
    },
});

app.use(createPinia()) // Configura Pinia como el sistema de gestión de estado para la aplicación
app.use(router) // Configura Vue Router para manejar la navegación entre vistas en la aplicación


// Monta la aplicación en el index con id 'app'
app.mount('#app')




