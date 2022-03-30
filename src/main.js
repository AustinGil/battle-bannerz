import { createApp } from 'vue'
import 'bedrocss'
import '@fontsource/vt323'
import './assets/styles/main.css'
// import { VBtn, VForm, VInput } from 'vuetensils'
import App from './App.vue'

const app = createApp(App)

// app.component('VBtn', VBtn)
// app.component('VForm', VForm)
// app.component('VInput', VInput)

app.mount('#app')
