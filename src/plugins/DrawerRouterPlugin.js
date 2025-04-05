// DrawerRouterPlugin.js
import { reactive } from 'vue'
import { markRaw } from 'vue'

export const drawerState = reactive({
  isOpen: false,
  baseRoute: null,
  overlayRoute: null
})

export function createDrawerRouterPlugin() {
  const drawerRoutes = new Set()
  let intendedRouteAfterHome = null

  return {
    install(app, { router }) {
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

      const isInitialNavigation = (route) => route.name === undefined && route.matched.length === 0

      router.beforeEach((to, from, next) => {
        const isDrawerRoute = isDrawerDestination(to, drawerRoutes)

        if (isDrawerRoute) {
          if (isInitialNavigation(from)) {
            intendedRouteAfterHome = to.fullPath
            next({ path: '/', replace: true })
            return
          }

          if (!drawerState.isOpen) {
            drawerState.baseRoute = markRaw(from)
            drawerState.isOpen = true
          }
          drawerState.overlayRoute = markRaw(to)
          next()

        } else {
          if(drawerState.isOpen) {
            drawerState.isOpen = false
          } else {
            // do not clean if we are closing, so state is kept in previous components
            drawerState.overlayRoute = null
            drawerState.baseRoute = null
          }
          next()
        }
      })

      router.afterEach(() => {
        if (intendedRouteAfterHome) {
          router.push(intendedRouteAfterHome)
          intendedRouteAfterHome = null
        }
      })

      app.provide('drawerRouter', {
        state: drawerState,
        isDrawerRoute: (routeName) => drawerRoutes.has(routeName),
        isDrawerActive: () => drawerState.isOpen
      })
    }
  }
}

function isDrawerDestination(route, drawerRoutes) {
  if (route.meta?.drawer) return true
  if (route.name && drawerRoutes.has(route.name)) return true
  if (route.matched && route.matched.some(r => r.meta?.drawer)) return true
  return false
}

import { useRouter } from 'vue-router'
export function useDrawerRouter() {
  const router = useRouter()

  return {
    drawerState,
    isDrawerOpen: () => drawerState.isOpen,
    closeDrawer() {
      if (drawerState.baseRoute) {
        router.push(drawerState.baseRoute)
      }
    }
  }
}