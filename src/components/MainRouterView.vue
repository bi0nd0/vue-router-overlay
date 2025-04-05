<!-- components/MainRouterView.vue -->
<script setup>
import { computed } from "vue";
import { useRouter, RouterView } from "vue-router";
import { drawerState } from "../plugins/DrawerRouterPlugin";

const router = useRouter();

const getDefaultRoute = () =>
  drawerState.baseRoute || router.currentRoute.value;

// Determine which route to display in the main view
const displayRoute = computed(() => {
  if (drawerState.isOpen && drawerState.baseRoute) {
    const baseRoute = drawerState.baseRoute;
    // filter routes that are not marked for drawer
    const matched = [...baseRoute.matched].filter(
      (_route) => _route.meta?.drawer !== true
    );
    return {
      ...baseRoute,
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
