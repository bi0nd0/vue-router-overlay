<!-- App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import DrawerView from './components/DrawerView.vue'
import MainRouterView from './components/MainRouterView.vue'

</script>

<template>
  <div class="app">
    <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/settings">Settings</router-link>
    <router-link to="/notifications">Notifications</router-link>
    <router-link to="/test">Test</router-link>
    <router-link to="/test/test">Test Nested</router-link>
  </nav>
    <!-- Main router view for regular routes -->
    <!-- <RouterView /> -->
    <MainRouterView />
    
    <!-- Drawer view for drawer routes -->
    <DrawerView width="450px" position="right" />
  </div>
</template>
