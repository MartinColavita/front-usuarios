<template>
  <div>
    <h1 class="display-4 mt-4">Mapa</h1>
    <!-- Contenedor para el mapa -->
    <div id="map" style="height: 400px;"></div>
    
    <!-- Información sobre los DEA y guía de ayuda -->
    <div class="mt-3">
      <h3>Información sobre los DEA</h3>
      <ul>
        <li v-for="dea in deas" :key="dea.id">
          <strong>Ubicación:</strong> {{ dea.location }}
          <br>
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
import L from 'leaflet';
import axios from 'axios';

export default {
  data() {
    return {
      deas: [], // Inicialmente, el arreglo de DEA estará vacío
    };
  },
  mounted() {
    // Crea el mapa
    const map = L.map('map').setView([latitud, longitud], zoom);

    // Agrega un fondo de mapa 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Realizar una solicitud a para obtener la lista de DEAs
    axios.get('http://127.0.0.1:8080/api/mapas/')
      .then(response => {
        // Asignar la lista de DEA desde la respuesta de la API
        this.deas = response.data;
        
        // Agregar marcadores de DEA al mapa
        this.deas.forEach((dea) => {
          L.marker([dea.latitud, dea.longitud]).addTo(map).bindPopup(`<b>${dea.cantDeas}</b><br>${dea.descripcion}</b><br>`).openPopup();
        });
      })
      .catch(error => {
        console.error('Error al obtener la lista de DEA:', error);
      });
  },
};
</script>



<style scoped>
  /* Estilos CSS personalizados para el mapa */
  #map {
    width: 100%;
    margin: 0 auto;
  }
</style>
