import { createApp } from 'vue'
import Vuetensils from 'vuetensils'
import 'bedrocss'
import '@fontsource/vt323'
import './assets/styles/main.css'
import App from './App.vue'

const app = createApp(App)

app.use(Vuetensils, {
  components: ['VTabs', 'VForm', 'VInput', 'VBtn']
})

app.mount('#app')
