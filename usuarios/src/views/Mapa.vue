<template>
  <div>
    <h1 class="display-4 mt-4">Mapa</h1>

    <!-- Contenedor para el mapa -->
    <div id="map" style="height: 400px"></div>

    <!-- Información sobre los DEA y guía de ayuda -->
    <div class="mt-3">
      <h3>Información sobre los DEA</h3>
      <ul>
        <li v-for="dea in deas" :key="dea.id">
          <strong>Ubicación:</strong> {{ dea.location }} <br />
          <strong>Descripción:</strong> {{ dea.description }}
        </li>
      </ul>

      <h3>Guía de Ayuda a Paso a Paso</h3>
      <ul>
        <li>Paso 1: Encuentra el DEA más cercano en el mapa.</li>
        <li>Paso 2: Ve hacia la ubicación del DEA.</li>
        <li>Paso 3: Asegúrate de que el área esté despejada.</li>
        <li>Paso 4: Sigue las instrucciones del DEA para su uso.</li>
        <li>Paso 5: Llama al servicio de emergencia local (ejemplo: 911).</li>
      </ul>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import axios from "axios";

// Latitud y longitud iniciales - La Plata : -34.92036049285432, -57.95385763860928
const latInicial = -34.92036049285432;
const lonInicial = -57.95385763860928;

export default {
  data() {
    return {
      deas: [], // inicializar arreglo vacío
    };
  },

  mounted() {
    // Crear mapa con lat/lon iniciales y zoom -> El nivel de zoom se puede configurar según las necesidades:
    //13 - Ciudades grandes ; 15 - Ciudades; 17 - Calles; 19 - Edificios
    const map = L.map("map").setView([latInicial, lonInicial], 13);

    // Agregar capa de OpenStreetMaps
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Obtener DEAs desde API
    axios
      .get("http://127.0.0.1:8081/api/mapas/")
      .then((response) => {
        this.deas = response.data;

        // Agregar marcadores de DEA al mapa
        this.deas.forEach((dea) => {
          L.marker([dea.latitud, dea.longitud])
            .addTo(map)
            .bindPopup(`<b>${dea.cantDeas}</b><br>${dea.descripcion}<br>`)
            .openPopup();
        });
      })
      .catch((error) => {
        console.error("Error obteniendo DEAs", error);
      });
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
