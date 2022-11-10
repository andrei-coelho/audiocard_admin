import { createApp } from 'vue'
import App from './App.vue'
import session from './plugins/session'

createApp(App)
.use(session)
.mount('#app')
