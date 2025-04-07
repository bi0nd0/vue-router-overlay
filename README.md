# Vue Router Overlay

## Install

```sh
yarn add https://github.com/bi0nd0/vue-router-overlay.git#1.0.0
# OR specify a name for the package
yarn add my-vue-router-overlay@https://github.com/bi0nd0/vue-router-overlay.git#1.0.0
```

## Usage

In use the plugin whem creating the app in the `main.js` file:

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createOverlayRouterPlugin } from 'vue-router-overlay'
import router from './router/index'

const app = createApp(App)

// Install the drawer router plugin
app.use(createOverlayRouterPlugin(), { router })
app.use(router)
app.mount('#app')
```

Use the custom `RouterViev` components in your app:

```vue
<!-- App.vue -->
<template>
  <div>
    <MainRouterView />
    <DrawerRouterView />
  </div>
</template>
```
