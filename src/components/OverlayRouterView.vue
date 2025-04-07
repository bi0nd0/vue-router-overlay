<!-- components/DrawerView.vue -->
<script>
// default function used to filter the matched routes
const defaultFilterFunction = (matched) => matched.filter(route => route.meta?.overlay === true)
</script>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { overlayState } from '../plugins/DrawerRouterPlugin'

const router = useRouter()
const isOpen = computed(() => overlayState.isOpen)


const props = defineProps({
  // Function to filter routes - receives matched routes array and returns filtered array
  filterMatchedRoutes: {
    type: Function,
    default: defaultFilterFunction
  }
})

// Create a modified version of the current drawer route
// that removes parent routes from the matched array
const overlayRouteView = computed(() => {
  if (!overlayState.overlayRoute) return null;
  
  // filter the matched routes
  const matched = props.filterMatchedRoutes([...overlayState.overlayRoute.matched])
  
  // Create a modified route object with only the drawer views
  // This prevents non-drawer views from being rendered in the drawer
  return {
    ...overlayState.overlayRoute,
    matched,
  };
});

// Handle escape key to close drawer
function handleKeyDown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeOverlay()
  }
}

const closeOverlay = () => {
  console.log('closing drawer')
  if (overlayState.baseRoute) {
    router.push(overlayState.baseRoute)
  }
}

// Add/remove global event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Handle browser back button
/* watch(() => router.currentRoute.value, (newRoute) => {
  if (isOpen.value && !newRoute.meta?.overlay && 
      !newRoute.matched?.some(r => r.meta?.overlay)) {
    overlayState.isOpen = false
    overlayState.overlayRoute = null
  }
}) */
</script>

<template>
  <RouterView v-if="overlayRouteView" :route="overlayRouteView" v-slot="routerProps">
    <slot v-bind="{...routerProps, isOpen, closeOverlay}">
      <component :is="routerProps.Component" :close-overlay="closeOverlay" :is-open="isOpen" />
    </slot>
  </RouterView>
</template>

<style scoped>

</style>