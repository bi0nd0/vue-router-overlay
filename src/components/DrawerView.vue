<!-- components/DrawerView.vue -->
<script setup>
import { computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { drawerState } from '../plugins/DrawerRouterPlugin'

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

const isOpen = computed(() => drawerState.isOpen)

// Create a modified version of the current drawer route
// that removes parent routes from the matched array
const drawerRouteView = computed(() => {
  if (!drawerState.overlayRoute) return null;
  
  // Find the last drawer component in the matched routes
  const matched = [...drawerState.overlayRoute.matched].filter(_route => _route.meta?.drawer===true);
  
  // Create a modified route object with only the drawer views
  // This prevents non-drawer views from being rendered in the drawer
  return {
    ...drawerState.overlayRoute,
    matched,
  };
});

const drawerStyle = computed(() => ({
  width: props.width,
  [props.position]: isOpen.value ? '0' : `-${props.width}`
}))

// Handle escape key to close drawer
function handleKeyDown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeDrawer()
  }
}

function closeDrawer() {
  // console.log('closing drawer')
  if (drawerState.baseRoute) {
    router.push(drawerState.baseRoute)
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
  if (isOpen.value && !newRoute.meta?.drawer && 
      !newRoute.matched?.some(r => r.meta?.drawer)) {
    drawerState.isOpen = false
    drawerState.overlayRoute = null
  }
}) */
</script>

<template>
  <div class="drawer-container" v-if="isOpen">
    <div class="drawer-backdrop" @click="closeDrawer"></div>
    <div class="drawer" :style="drawerStyle">
      <div class="drawer-header">
        <div>
          <span>{{ drawerState.overlayRoute.meta?.title ?? '' }}</span>
        </div>
        <button class="drawer-close" @click="closeDrawer">×</button>
      </div>
      <div class="drawer-content">
        <RouterView v-if="drawerRouteView" :route="drawerRouteView" v-slot="{ Component }">
          <div>asdasdsa</div>
          <component :is="Component"/>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
}

.drawer-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}

.drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s, left 0.3s;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.drawer-close {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
</style>