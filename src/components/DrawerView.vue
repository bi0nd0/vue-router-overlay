<!-- components/DrawerView.vue -->
<script setup>
import OverlayView from './OverlayView.vue'
import Drawer from './Drawer.vue'
</script>

<template>
  <OverlayView v-slot="{isOpen, Component, closeOverlay}">
    <Drawer :is-open="isOpen" @hide="closeOverlay">
      <component :is="Component"/>
    </Drawer>
  </OverlayView>
</template>

<style scoped></style>