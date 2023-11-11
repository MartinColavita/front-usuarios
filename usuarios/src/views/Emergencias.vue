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
      <h3 class="section-title">DEAs más cercanos</h3>
      <!-- Lista de DEA más cercanos -->
      <ul class="guide-list">
        <!-- Recorremos solo los 5 DEAs más cercanos y mostramos su información -->
        <li
          v-for="(dea, index) in deas.slice(0, 5)"
          :key="index"
          class="dea-item"
          :class="{ selected: dea === selectedDea }"
          @click="selectDea(dea)"
        >
          <!-- Información del DEA -->
          <strong>Descripción:</strong> {{ dea.descripcion }}<br />
          <strong>Cantidad de DEAs:</strong> {{ dea.cantDeas }}<br />
          <!-- Botón para enviar un aviso de emergencia -->
          <button @click="enviarMail(dea.mail)">Aviso de emergencia</button>
        </li>
      </ul>
    </div>

    <!-- Guía de Ayuda a Paso a Paso -->
    <div class="info-section guideA">
      <h3 class="section-title">Guía de Ayuda a Paso a Paso</h3>
      <ul class="guide-Ayuda">
        <li>Paso 1: Encuentra el DEA más cercano en el mapa.</li>
        <li>Paso 2: Ve hacia la ubicación del DEA.</li>
        <li>Paso 3: Asegúrate de que el área esté despejada.</li>
        <li>Paso 4: Sigue las instrucciones del DEA para su uso.</li>
        <li>Paso 5: Llama al servicio de emergencia local (ejemplo: 911).</li>
        <li>Paso 6: Continúa con la RCP hasta que llegue la ayuda.</li>
      </ul>
    </div>

    <!-- Reproductor de audio -->
    <div class="audio-player">
      <h3 class="section-title">Audio guía para hacer RCP</h3>
      <div class="audio-controls">
        <!-- Controles del reproductor de audio -->
        <audio controls class="w-100">
          <!-- Ruta local al archivo de audio -->
          <source
            :src="require('@/assets/audio/AudioRCP.mp3')"
            type="audio/mp3"
          />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
// Importación de las bibliotecas y archivos necesarios
import L from "leaflet";
import axios from "axios";

// Componente Vue
export default {
  // Datos del componente
  data() {
    return {
      // Arreglo para almacenar los DEAs
      deas: [],
      // Latitud inicial - Argentina
      latInicial: -34.92036049285432,
      // Longitud inicial - Argentina
      lonInicial: -57.95385763860928,
      // DEA seleccionado
      selectedDea: null,
      // Mapa Leaflet
      map: null,
    };
  },

  // Método que se ejecuta después de que el componente ha sido montado en el DOM
  mounted() {
    // Crear mapa y obtener ubicación del usuario
    this.map = L.map("map").setView([this.latInicial, this.lonInicial], 15);

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this.map);

    if ("geolocation" in navigator) {
      // Obtener la ubicación del usuario si está disponible
      navigator.geolocation.getCurrentPosition((position) => {
        // Coordenadas del usuario
        const latitudUsuario = position.coords.latitude;
        const longitudUsuario = position.coords.longitude;

        // Agregar un marcador especial para la ubicación del usuario
        const userIcon = L.icon({
          iconUrl: "/icons/miUbicacion.ico",
          iconSize: [32, 32], // Tamaño del icono
          iconAnchor: [16, 32], // Punto de anclaje del icono
        });

        L.marker([latitudUsuario, longitudUsuario], { icon: userIcon })
          .addTo(this.map)
          .bindPopup("Tu ubicación actual")
          .openPopup();

        // Calcular distancias y ordenar los DEAs por cercanía
        this.deas.forEach((dea) => {
          const latitudDea = parseFloat(dea.latitud);
          const longitudDea = parseFloat(dea.longitud);

          if (!isNaN(latitudDea) && !isNaN(longitudDea)) {
            const distancia = this.calcularDistancia(
              latitudUsuario,
              longitudUsuario,
              latitudDea,
              longitudDea
            );
            dea.distancia = distancia;
          } else {
            console.error(`Coordenadas inválidas para ${dea.descripcion}`);
          }
        });

        // Limitar la cantidad de DEAs a mostrar (solo los 5 más cercanos)
        const deasAMostrar = this.deas
          .sort((a, b) => a.distancia - b.distancia)
          .slice(0, 5);

        // Agregar marcadores al mapa para las 5 direcciones más cercanas
        deasAMostrar.forEach((dea) => {
          const latitud = parseFloat(dea.latitud);
          const longitud = parseFloat(dea.longitud);

          if (!isNaN(latitud) && !isNaN(longitud)) {
            // Agregar marcador al mapa con información del DEA y enlace para centrar
            const customIcon = L.icon({
              iconUrl: "/icons/ubicacionDea.ico", // Ruta a tu icono personalizado
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });

            const marker = L.marker([latitud, longitud], { icon: customIcon })
              .addTo(this.map)
              .bindPopup(
                `<b>${dea.cantDeas}</b><br>${dea.descripcion}<br><br>${dea.mail}<br>` +
                  `<a href="#" @click="centrarEnDea(${latitud}, ${longitud})">Centrar en el mapa</a>`
              );

            // Asignar el marcador al DEA para referencia futura
            dea.marker = marker;
          } else {
            console.error(`Coordenadas inválidas para ${dea.descripcion}`);
          }
        });
      });
    } else {
      console.error("Geolocalización no está disponible en este navegador.");
    }

    // Obtener DEAs desde la API
    axios
      .get("http://127.0.0.1:8081/api/mapas/")
      .then((response) => {
        // Almacena la información de los DEAs en el array deas
        this.deas = response.data;

        // Agregar marcadores de DEA al mapa
        this.deas.forEach((dea) => {
          const latitud = parseFloat(dea.latitud);
          const longitud = parseFloat(dea.longitud);

          if (!isNaN(latitud) && !isNaN(longitud)) {
            // Agregar marcador al mapa con información del DEA y enlace para centrar
            const customIcon = L.icon({
              iconUrl: "/icons/ubicacionDea.ico", // Ruta a tu icono personalizado
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });

            const marker = L.marker([latitud, longitud], { icon: customIcon })
              .addTo(this.map)
              .bindPopup(
                `<b>${dea.cantDeas}</b><br>${dea.descripcion}<br><br>${dea.mail}<br>` +
                  `<a href="#" @click="centrarEnDea(${latitud}, ${longitud})">Centrar en el mapa</a>`
              );

            // Asignar el marcador al DEA para referencia futura
            dea.marker = marker;
          } else {
            console.error(`Coordenadas inválidas para ${dea.descripcion}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error obteniendo DEAs", error);
      });
  },

  // Métodos del componente
  methods: {
    // Método para calcular la distancia entre dos coordenadas
    calcularDistancia(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = R * c;
      return distancia;
    },

    // Método para enviar un correo al DEA más cercano
    enviarMail(email) {
      axios
        .post("http://tu-servidor-java/enviar-correo", {
          to: email,
          subject: "Emergencia detectada",
          message: "Se aproxima un afectado. ¡Necesitamos ayuda!",
        })
        .catch((error) => {
          console.error("Error al enviar el correo", error);
        });
    },

    // Método para centrar el mapa en las coordenadas de un DEA
    centrarEnDea(latitud, longitud) {
      this.map.setView([latitud, longitud], 15);
    },

    // Método para seleccionar un DEA y centrar el mapa en él
    selectDea(dea) {
      if (this.selectedDea) {
        // Restaurar el estilo del DEA previamente seleccionado
        this.selectedDea.marker.closePopup();
      }

      // Seleccionar el nuevo DEA
      this.selectedDea = dea;

      // Centrar el mapa en las coordenadas del DEA
      this.map.setView([parseFloat(dea.latitud), parseFloat(dea.longitud)], 15);

      // Abrir el popup del DEA seleccionado
      dea.marker.openPopup();
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
/* Estilos del componente (scoped) */
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

.guideA {
  background-color: #f0ffe6;
  padding: 10px;
  border-radius: 5px;
}

.guide-Ayuda {
  list-style: disc;
  margin-left: 20px;
  padding: 0;
}

/* Estilos específicos para el reproductor de audio */
.audio-player {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilos para el contenedor de los controles de audio */
.audio-controls {
  margin-bottom: 10px;
}

/* Estilos para el botón dentro del reproductor de audio */
.audio-player button {
  margin-top: 10px;
}

/* Estilos específicos para el reproductor de audio */
.audio-player {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilos para el contenedor de los controles de audio */
.audio-controls {
  margin-bottom: 10px;
}

/* Estilos para el botón dentro del reproductor de audio */
.audio-player button {
  margin-top: 10px;
  /* Estilos adicionales para mejorar la apariencia */
  padding: 10px 15px;
  font-size: 16px;
}

/* Estilos responsivos para el botón en pantallas pequeñas */
@media (max-width: 576px) {
  .audio-player button {
    font-size: 14px;
  }
}

/* Estilo para resaltar el DEA seleccionado */
.dea-item.selected {
  background-color: #f0f0f0;
}

/* Estilo para resaltar el DEA seleccionado */
.dea-item.selected {
  background-color: #f0ffe6;
}
</style>