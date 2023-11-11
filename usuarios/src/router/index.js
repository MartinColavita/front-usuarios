import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Mapa from "../views/Mapa.vue";
import TelefonosUtiles from "../views/TelefonosUtiles.vue";
import Emergencias from "../views/Emergencias.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/mapa",
    component: Mapa,
  },

  {
    path: "/telefonos-utiles",
    component: TelefonosUtiles,
  },

  {
    path: "/emergencias", // Ruta para el botón de emergencia
    name: "Emergencias",
    component: Emergencias, // Asigna el componente Emergencias.vue
  },

  // Actualizar ruta comodín
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
