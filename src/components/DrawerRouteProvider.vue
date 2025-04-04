<!-- components/DrawerRouteProvider.vue -->
<script setup>
import { watch, computed, provide, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { drawerState } from '../plugins/DrawerRouterPlugin'

const router = useRouter()

// Expose whether drawer is open
const isOpen = computed(() => drawerState.isOpen)

// Create a modified version of the current drawer route
// that removes parent routes from the matched array
const drawerRouteView = computed(() => {
  if (!drawerState.currentDrawerRoute) return null;
  
  // Find the last drawer component in the matched routes
  const matched = [...drawerState.currentDrawerRoute.matched];
  const drawerIndex = matched.findLastIndex(route => route.meta?.drawer);
  
  if (drawerIndex === -1) return drawerState.currentDrawerRoute;
  
  // Create a modified route object with only the drawer component
  return {
    ...drawerState.currentDrawerRoute,
    matched: drawerIndex >= 0 ? [matched[drawerIndex]] : matched
  };
});

// Methods for drawer control
function closeDrawer() {
  if (drawerState.previousRoute) {
    router.push(drawerState.previousRoute)
  }
}

// Handle browser back button
watch(() => router.currentRoute.value, (newRoute) => {
  if (isOpen.value && !newRoute.meta?.drawer && 
      !newRoute.matched?.some(r => r.meta?.drawer)) {
    drawerState.isOpen = false
    drawerState.currentDrawerRoute = null
  }
})

// Handle escape key
function handleKeyDown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeDrawer()
  }
}

// Setup and cleanup event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Provide values to any consuming component
provide('drawerRouteProvider', {
  isOpen,
  drawerRouteView,
  closeDrawer
})
</script>

<template>
  <!-- This is a renderless component, so it doesn't render anything itself -->
  <slot :is-open="isOpen" :route="drawerRouteView" :close="closeDrawer"></slot>
</template>