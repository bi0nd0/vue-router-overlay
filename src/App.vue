<!-- App.vue -->
<script setup>
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
     <DrawerRouterView />
  </div>
</template>
<style>
nav {
  display: flex;
  gap: 5px;
}
</style>
