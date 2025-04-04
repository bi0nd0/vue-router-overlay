// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createDrawerRouterPlugin } from './plugins/DrawerRouterPlugin'
import router from './router/index'

const app = createApp(App)

// Install the drawer router plugin
app.use(createDrawerRouterPlugin(), { router })

app.use(router)
app.mount('#app')
