// DrawerRouterPlugin.js
import { reactive } from 'vue'
import { markRaw } from 'vue'

export const overlayState = reactive({
  isOpen: false,
  baseRoute: null,
  overlayRoute: null
})

export function createOverlayRouterPlugin() {
  const overlayRoutes = new Set()
  let intendedRouteAfterHome = null

  return {
    install(app, { router }) {
      const scanRoutes = (routes, parentPath = '') => {
        routes.forEach(route => {
          const fullPath = parentPath + (route.path.startsWith('/') ? route.path : `/${route.path}`)

          if (route.meta?.overlay) {
            overlayRoutes.add(route.name || fullPath)
          }

          if (route.children) {
            scanRoutes(route.children, fullPath)
          }
        })
      }

      scanRoutes(router.getRoutes())

      const isInitialNavigation = (route) => route.name === undefined && route.matched.length === 0

      router.beforeEach((to, from, next) => {
        const isOverlayRoute = isOverlayDestination(to, overlayRoutes)

        if (isOverlayRoute) {
          if (isInitialNavigation(from)) {
            intendedRouteAfterHome = to.fullPath
            next({ path: '/', replace: true })
            return
          }

          if (!overlayState.isOpen) {
            overlayState.baseRoute = markRaw(from)
            overlayState.isOpen = true
          }
          overlayState.overlayRoute = markRaw(to)
          next()

        } else {
          if(overlayState.isOpen) {
            overlayState.isOpen = false
          } else {
            // do not clean if we are closing, so state is kept in previous components
            overlayState.overlayRoute = null
            overlayState.baseRoute = null
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

      app.provide('overlayRouter', {
        state: overlayState,
        isOverlayRoute: (routeName) => overlayRoutes.has(routeName),
        isOverlayActive: () => overlayState.isOpen
      })
    }
  }
}

function isOverlayDestination(route, overlayRoutes) {
  if (route.meta?.overlay) return true
  if (route.name && overlayRoutes.has(route.name)) return true
  if (route.matched && route.matched.some(r => r.meta?.overlay)) return true
  return false
}

import { useRouter } from 'vue-router'
export function useOverlayRouter() {
  const router = useRouter()

  return {
    overlayState,
    isOverlayOpen: () => overlayState.isOpen,
    closeOverlay() {
      if (overlayState.baseRoute) {
        router.push(overlayState.baseRoute)
      }
    }
  }
}