import { createApp } from 'vue'

// import komponen app dan router
import App from './App.vue'
import router from './router'

// import css tailwind
import '../styles/main.css';

// membuat app vue
const app = createApp(App)

// gunakan router dari komponen menggunakan use
app.use(router)

app.mount('#app')
