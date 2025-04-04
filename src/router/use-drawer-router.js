// useDrawerRouter.js
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { drawerState } from './DrawerRouterPlugin'

export function useDrawerRouter() {
  const router = useRouter()
  const drawerRouter = inject('drawerRouter')
  
  return {
    isDrawerOpen: () => drawerState.isOpen,
    
    closeDrawer() {
      if (drawerState.previousRoute) {
        router.push(drawerState.previousRoute)
      }
    },
    
    isDrawerRoute(routeName) {
      return drawerRouter.isDrawerRoute(routeName)
    },
    
    getCurrentDrawerRoute() {
      return drawerState.currentDrawerRoute
    },
    
    getPreviousRoute() {
      return drawerState.previousRoute
    }
  }
}
