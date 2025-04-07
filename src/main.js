// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createOverlayRouterPlugin } from './plugins/DrawerRouterPlugin'
import router from './router/index'

const app = createApp(App)

// Install the drawer router plugin
app.use(createOverlayRouterPlugin(), { router })

app.use(router)
app.mount('#app')
