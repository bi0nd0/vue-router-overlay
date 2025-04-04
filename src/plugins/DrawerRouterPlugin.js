// DrawerRouterPlugin.js
import { reactive } from 'vue'
import { markRaw } from 'vue'

export const drawerState = reactive({
  isOpen: false,
  previousRoute: null,
  currentDrawerRoute: null
})

export function createDrawerRouterPlugin() {
  const drawerRoutes = new Set()
  
  return {
    install(app, { router }) {
      // Scan all routes for drawer meta
      const scanRoutes = (routes, parentPath = '') => {
        routes.forEach(route => {
          const fullPath = parentPath + (route.path.startsWith('/') ? route.path : `/${route.path}`)
          
          if (route.meta?.drawer) {
            drawerRoutes.add(route.name || fullPath)
          }
          
          if (route.children) {
            scanRoutes(route.children, fullPath)
          }
        })
      }
      
      scanRoutes(router.getRoutes())
      
      // Register global beforeEach guard
      router.beforeEach((to, from, next) => {
        const isDrawerRoute = isDrawerDestination(to, drawerRoutes)
        
        if (isDrawerRoute) {
          // Store the current route as previous if this is first drawer navigation
          if (!drawerState.isOpen) {
            drawerState.previousRoute = markRaw(from)
            drawerState.isOpen = true
          }
          drawerState.currentDrawerRoute = markRaw(to)
          next()
        } else {
          // Regular route navigation
          drawerState.isOpen = false
          drawerState.currentDrawerRoute = null
          drawerState.previousRoute = null
          next()
        }
      })
      
      // Provide drawer state to the app
      app.provide('drawerRouter', {
        state: drawerState,
        isDrawerRoute: (routeName) => drawerRoutes.has(routeName),
        isDrawerActive: () => drawerState.isOpen
      })
    }
  }
}

// Helper function to check if destination is a drawer route
function isDrawerDestination(route, drawerRoutes) {
  // Check if this route is directly a drawer route
  if (route.meta?.drawer) return true;
  
  // Check if this route name is registered as a drawer route
  if (route.name && drawerRoutes.has(route.name)) return true;
  
  // Check if any of the matched routes have drawer meta
  if (route.matched && route.matched.some(r => r.meta?.drawer)) return true;
  
  return false;
}

// Composable for components to use
export function useDrawerRouter() {
  const router = useRouter();
  
  return {
    drawerState,
    isDrawerOpen: () => drawerState.isOpen,
    closeDrawer() {
      if (drawerState.previousRoute) {
        router.push(drawerState.previousRoute)
      }
    }
  }
}