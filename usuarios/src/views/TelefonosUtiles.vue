<template>
  <div>
    <h1 class="display-4 mt-4 mb-4">Teléfonos Útiles</h1>

    <!-- Botones de teléfonos útiles -->
    <div class="list-group mt-4">
      <button v-for="telefono in telefonos" :key="telefono.id" @click="llamar(telefono.numero)" class="list-group-item list-group-item-action btn btn-danger">
        {{ telefono.nombre }}
      </button>
    </div>

    <!-- Información detallada de teléfonos útiles -->
    <div class="mt-4">
      <h3 class="mt-3">Información de Teléfonos Útiles</h3>
      <ul class="list-group">
        <li v-for="telefono in telefonos" :key="telefono.id" class="list-group-item">
          <strong>{{ telefono.descripcion }}:</strong> {{ telefono.numero }}
          <br>
          <span>{{ telefono.descripcion }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import ApiService from '@/services/ApiService';

export default {
  data() {
    return {
      telefonos: [], // Inicialmente, la lista de teléfonos estará vacía
    };
  },
  mounted() {
    // Obtener la lista de números de teléfono de emergencia desde la API
    ApiService.getTelefonosUtiles()
      .then(response => {
        this.telefonos = response.data;
      })
      .catch(error => {
        console.error('Error al obtener la lista de números de teléfono de emergencia:', error);
      });
  },
  methods: {
    llamar(numero) {
      if (window.innerWidth <= 768) {
        // Si el dispositivo es un telefono o tablet, activar llamada telefónica
        window.location.href = `tel:${numero}`;
      } else {
        // Si es un dispositivo de escritorio, mostrar el número y descripción
        const telefono = this.telefonos.find(t => t.numero === numero);
        if (telefono) {
          alert(`Número: ${telefono.numero}\nDescripción: ${telefono.descripcion}`);
        }
      }
    },
  },
};
</script>