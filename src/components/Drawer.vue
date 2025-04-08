<!-- components/DrawerView.vue -->
<script setup>
import { computed, toRefs } from 'vue'
import { overlayState } from '../plugins/DrawerRouterPlugin'

const props = defineProps({
  width: {
    type: String,
    default: '400px'
  },
  position: {
    type: String,
    default: 'right' // 'right' or 'left'
  },
  isOpen: { type: Boolean, default: false }
})

const { isOpen } = toRefs(props)

const emit = defineEmits(['hide'])

function closeDrawer() {
  setTimeout(() => {
    console.log('hiding')
    emit('hide')
  }, 0);
}

const drawerStyle = computed(() => ({
  width: props.width,
  [props.position]: isOpen.value ? '0' : `-${props.width}`
}))


</script>

<template>
  <div class="drawer-container" v-if="isOpen">
    <div class="drawer-backdrop" @click="closeDrawer"></div>
    <div class="drawer" :style="drawerStyle">
      <div class="drawer-header">
        <div>
          <span>{{ overlayState.overlayRoute.meta?.title ?? '' }}</span>
        </div>
        <button class="drawer-close" @click="closeDrawer">×</button>
      </div>
      <div class="drawer-content">
          <div>asdasdsa</div>
          <slot></slot>
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