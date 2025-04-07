<!-- components/DrawerView.vue -->
<script setup>
import OverlayRouterView from './OverlayRouterView.vue'
import Drawer from './Drawer.vue'
</script>

<template>
  <OverlayRouterView v-slot="{isOpen, Component, closeOverlay}">
    <Drawer :is-open="isOpen" @hide="closeOverlay">
      <component :is="Component"/>
    </Drawer>
  </OverlayRouterView>
</template>

<style scoped></style>