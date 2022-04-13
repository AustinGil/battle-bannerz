import { createApp } from 'vue'
import Vuetensils from 'vuetensils'
import 'vuetensils/dist/style.css'
import 'bedrocss'
import '@fontsource/vt323'
import './assets/styles/main.css'
import App from './App.vue'
import AppInput from './components/AppInput.vue'
import VInput from './components/VInput.vue'

const app = createApp(App)

app.use(Vuetensils, {
  components: ['VTabs', 'VForm', 'VBtn']
})
app.component('VInput', VInput)
app.component('AppInput', AppInput)

app.mount('#app')
