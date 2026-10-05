import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { initAuth } from './composables/useAuth'
import router from './router'

await initAuth()

createApp(App).use(router).mount('#app')
