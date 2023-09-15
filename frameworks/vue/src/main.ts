import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Auth from '@/auth'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.$auth = Auth
