import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Mapa from "../views/Mapa.vue";
import TelefonosUtiles from "../views/TelefonosUtiles.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/mapa", component: Mapa },
  { path: "/telefonos-utiles", component: TelefonosUtiles },
  { path: "*", redirect: "/" }, // Ruta predeterminada redirige a la vista de inicio
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
