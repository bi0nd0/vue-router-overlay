// routes.js
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import TestView from "../views/TestView.vue";
import Notification from "../views/Notification.vue";
import HelloWorld from "../components/HelloWorld.vue";
import NotificationsDrawer from "../views/NotificationsDrawer.vue";

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
    component: Notification,
    meta: { drawer: true }, // This parent and all children will open in drawer
  },
  {
    path: "/test",
    component: TestView,
    children: [
      {
        path: "",
        name: "test",
        component: Notification,
        meta: { drawer: true, title: "something nested" },
      },
      { path: "hello-world", name: "hello-world", component: HelloWorld },
      {
        path: "nested",
        name: "nested-test",
        component: NotificationsDrawer,
        meta: { drawer: true },
        children: [
          {
            path: "notification",
            name: "nested-notifications",
            component: Notification,
            meta: { drawer: true }, // This parent and all children will open in drawer
          },
        ],
      },
    ],
  },
];
