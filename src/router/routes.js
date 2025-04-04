// routes.js
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import TestView from "../views/TestView.vue";
import NotificationsDrawer from "../views/NotificationsDrawer.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: NotificationsDrawer,
    meta: { drawer: true }, // This parent and all children will open in drawer
  },
  {
    path: "/test",
    component: TestView,
    children: [
      {
        path: "",
        name: "nested",
        component: NotificationsDrawer,
        meta: { drawer: true, title: "something nested" },
      },
      { path: "test", name: "nested-test", component: HelloWorld },
    ],
  },
];
