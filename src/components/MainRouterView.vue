<!-- components/MainRouterView.vue -->
<script setup>
import { computed } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { drawerState } from '../plugins/DrawerRouterPlugin'

const router = useRouter()

const getDefaultRoute = () => drawerState.previousRoute || router.currentRoute.value;

// Determine which route to display in the main view
const displayRoute = computed(() => {
  if (drawerState.isOpen && drawerState.currentDrawerRoute) {
    // For nested routes, create a modified route that includes parent routes
    // but excludes the drawer component itself
    const currentRoute = drawerState.currentDrawerRoute;
    const matched = [...currentRoute.matched];
    
    // Find the index of the last component with drawer: true meta
    const drawerIndex = matched.findLastIndex(route => route.meta?.drawer);
    
    if (drawerIndex > 0) {
      // If the drawer component is nested, keep its parent routes
      // but remove the drawer component itself
      return {
        ...currentRoute,
        matched: matched.slice(0, drawerIndex)
      };
    } else if (drawerIndex === 0) {
      // If the drawer component is at the root, show the previous route
      return getDefaultRoute();
    }
  }
  
  // Default
  return getDefaultRoute();
})

// Keep track of the route for rendering
const routeKey = computed(() => {
  return displayRoute.value.fullPath;
})
</script>

<template>
    <RouterView :key="routeKey" :route="displayRoute" v-slot="{ Component }">

    </RouterView>
</template>