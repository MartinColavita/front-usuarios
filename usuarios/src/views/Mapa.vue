<template>
  <div class="map-container">
    <!-- Encabezado de la página -->
    <h1 class="display-4 mt-4">Mapa</h1>

    <!-- Contenedor para el mapa -->
    <div class="map-wrapper">
      <!-- Div para el mapa con el id "map" -->
      <div id="map"></div>
    </div>

    <!-- Información sobre los DEA -->
    <div class="info-section guide">
      <!-- Título de la sección de DEA más cercanos -->
      <h3 class="section-title">Información sobre los DEAs del mapa</h3>
      <!-- Lista de DEA más cercanos -->
      <ul class="guide-list">
        <!-- Recorremos todos los DEAs y mostramos su información -->
        <li
          v-for="dea in deas"
          :key="dea.id"
          class="dea-item"
          @click="seleccionarDea(dea)"
          :class="{ selected: dea === deaSeleccionado }"
        >
          <!-- Información del DEA -->
          <strong>Descripción:</strong> {{ dea.descripcion }}<br />
          <strong>Cantidad de DEAs:</strong> {{ dea.cantDeas }}<br />
        </li>
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
      latInicial: -34.92036049285432, // Latitud inicial - Argentina
      lonInicial: -57.95385763860928, // Longitud inicial - Argentina
      deaSeleccionado: null, // Almacena el DEA seleccionado
      map: null, // Referencia al objeto del mapa
    };
  },

  mounted() {
    // Crear mapa con lat/lon iniciales y zoom
    this.map = L.map("map").setView([this.latInicial, this.lonInicial], 5);

    // Agregar capa de OpenStreetMaps
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this.map);

    // Definir un icono personalizado para todos los DEAs
    const deaIcon = L.icon({
      iconUrl: "/icons/ubicacionDea.ico",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

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
            // Agregar marcador al mapa con icono personalizado
            dea.marker = L.marker([latitud, longitud], { icon: deaIcon })
              .addTo(this.map)
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

  methods: {
    // Método para seleccionar un DEA y hacer zoom en su ubicación
    seleccionarDea(dea) {
      // Desactivar la selección del DEA anterior (si hay alguno)
      if (this.deaSeleccionado) {
        this.deaSeleccionado.marker.closePopup();
      }

      // Activar la selección del nuevo DEA
      this.deaSeleccionado = dea;
      dea.marker.openPopup();
      this.map.setView(dea.marker.getLatLng(), 15);
    },

    beforeDestroy() {
      // Destruir el mapa y los marcadores cuando cambias de vista(para que no me muestre varios marcadores en el mapa)
      if (this.map) {
        this.map.remove();
      }
    },
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

/* Estilo para resaltar el DEA seleccionado */
.dea-item.selected {
  background-color: #f0ffe6;
}
</style>
