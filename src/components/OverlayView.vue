<!-- components/DrawerView.vue -->
<script setup>
import { computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { overlayState } from '../plugins/DrawerRouterPlugin'

const props = defineProps({
  width: {
    type: String,
    default: '400px'
  },
  position: {
    type: String,
    default: 'right' // 'right' or 'left'
  }
})

const router = useRouter()

const isOpen = computed(() => overlayState.isOpen)

// Create a modified version of the current drawer route
// that removes parent routes from the matched array
const overlayRouteView = computed(() => {
  if (!overlayState.overlayRoute) return null;
  
  // Find the last drawer component in the matched routes
  const matched = [...overlayState.overlayRoute.matched].filter(_route => _route.meta?.overlay===true);
  
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