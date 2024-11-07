import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import EditCurrencyView from "@/views/EditCurrencyView.vue";
import ModifiedView from "@/views/ModifiedView.vue";
import SearchCurrencyView from "@/views/SearchCurrencyView.vue";
import ErrorPage from "@/views/ErrorView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/edit/:currencyCode",
    name: "EditCurrency",
    component: EditCurrencyView,
    props: true,
  },
  {
    path: "/modified",
    name: "Modified",
    component: ModifiedView,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchCurrencyView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
