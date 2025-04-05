<!-- components/MainRouterView.vue -->
<script setup>
import { computed } from "vue";
import { useRouter, RouterView } from "vue-router";
import { drawerState } from "../plugins/DrawerRouterPlugin";

const router = useRouter();

const getDefaultRoute = () =>
  drawerState.previousRoute || router.currentRoute.value;

// Determine which route to display in the main view
const displayRoute = computed(() => {
  if (drawerState.isOpen && drawerState.previousRoute) {
    const previousRoute = drawerState.previousRoute;
    // filter routes that are not marked for drawer
    const matched = [...previousRoute.matched].filter(
      (_route) => _route.meta?.drawer !== true
    );
    return {
      ...previousRoute,
      matched,
    };
  }
  return getDefaultRoute();
});

// Keep track of the route for rendering
const routeKey = computed(() => {
  return displayRoute.value.fullPath;
});
</script>

<template>
  <RouterView :key="routeKey" :route="displayRoute" v-slot="{ Component }">
  </RouterView>
</template>
