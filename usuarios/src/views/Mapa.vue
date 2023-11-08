<template>
  <div class="map-container">
    <!-- Encabezado de la página -->
    <h1 class="display-4 mt-4">Mapa</h1>

    <!-- Contenedor para el mapa -->
    <div class="map-wrapper">
      <div id="map"></div>
    </div>

    <!-- Información sobre los DEA -->
    <div class="info-section">
      <h3 class="section-title">Información sobre los DEAs mas cercanos</h3>
      <ul class="dea-list">
        <!-- Recorremos los DEAs y mostramos su información -->
        <li v-for="dea in deas" :key="dea.id" class="dea-item">
          <!-- Mostramos la ubicación y descripción de los DEAs 
          <strong>Ubicación:</strong> {{ dea.latitud }}, {{ dea.longitud
          }}<br />-->

          <strong>Descripción:</strong> {{ dea.descripcion }}<br />
          <!-- Agregamos la cantidad de DEAs en la ubicación -->
          <strong>Cantidad de DEAs:</strong> {{ dea.cantDeas }}
        </li>
      </ul>
    </div>

    <!-- Guía de Ayuda a Paso a Paso -->
    <div class="info-section guide">
      <h3 class="section-title">Guía de Ayuda a Paso a Paso</h3>
      <ul class="guide-list">
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

export default {
  data() {
    return {
      deas: [],
      latInicial: -34.92036049285432, // Latitud inicial - La Plata
      lonInicial: -57.95385763860928, // Longitud inicial - La Plata
    };
  },

  mounted() {
    // Crear mapa con lat/lon iniciales y zoom -> El nivel de zoom se puede configurar según las necesidades:
    //13 - Ciudades grandes ; 15 - Ciudades; 17 - Calles; 19 - Edificios
    const map = L.map("map").setView([this.latInicial, this.lonInicial], 13);

    // Agregar capa de OpenStreetMaps
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Obtener DEAs desde la API
    axios
      .get("http://127.0.0.1:8081/api/mapas/")
      .then((response) => {
        this.deas = response.data;

        // Agregar marcadores de DEA al mapa
        this.deas.forEach((dea) => {
          // Parsear las coordenadas de cadena a números
          const latitud = parseFloat(dea.latitud);
          const longitud = parseFloat(dea.longitud);

          if (!isNaN(latitud) && !isNaN(longitud)) {
            L.marker([latitud, longitud])
              .addTo(map)
              .bindPopup(`<b>${dea.cantDeas}</b><br>${dea.descripcion}<br>`)
              .openPopup();
          } else {
            console.error(`Coordenadas inválidas para ${dea.descripcion}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error obteniendo DEAs", error);
      });
  },
};
</script>

<style scoped>
.map-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.map-wrapper {
  width: 100%;
  max-height: 400px;
  margin: 20px 0;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}

.info-section {
  margin-top: 20px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.dea-list {
  list-style: none;
  padding: 0;
}

.dea-item {
  margin: 10px 0;
}

.guide {
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 5px;
}

.guide-list {
  list-style: disc;
  margin-left: 20px;
  padding: 0;
}

.guide-list li {
  margin: 5px 0;
}
</style>
