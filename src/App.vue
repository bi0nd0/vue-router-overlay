<!-- App.vue -->
<script setup>
import DrawerView from './components/DrawerView.vue'
import OverlayView from './components/OverlayView.vue'
import Drawer from './components/Drawer.vue'
import MainRouterView from './components/MainRouterView.vue'

</script>

<template>
  <div class="app">
    <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/settings">Settings</router-link>
    <router-link to="/notifications">Notifications</router-link>
    <router-link to="/test">Test</router-link>
    <router-link to="/test/hello-world">Hello World</router-link>
    <router-link to="/test/nested">Nested</router-link>
    <router-link to="/test/nested/notification">Nested Notification</router-link>
  </nav>
    <!-- Main router view for regular routes -->
    <!-- <RouterView /> -->
    <MainRouterView />
    
    <!-- Drawer view for drawer routes -->
    <!-- <DrawerView width="450px" position="right" /> -->
     <OverlayView v-slot="{isOpen, Component, closeOverlay}">
      {{ isOpen }}
        <Drawer :is-open="isOpen" @hide="closeOverlay">
          asdas
          <component :is="Component"/>
        </Drawer>
      </OverlayView>
  </div>
</template>
<style>
nav {
  display: flex;
  gap: 5px;
}
</style>
