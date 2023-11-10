<template>
  <div>
    <h1 class="display-4 mt-4">Teléfonos Útiles</h1>

    <!-- Botones de teléfonos útiles con imagen predeterminada -->
    <div class="list-group mt-4">
      <button
        v-for="telefono in telefonos"
        :key="telefono.id"
        @click="llamar(telefono.numero)"
        class="list-group-item list-group-item-action"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <img
              src="@/assets/logo.png"
              alt="Imagen del teléfono"
              class="telefono-imagen"
            />
          </div>
          <div>
            <div>Teléfono Útil</div>
            <div>{{ telefono.descripcion }}</div>
          </div>
        </div>
      </button>
    </div>

    <!-- Información detallada de teléfonos útiles -->
    <!--     <div class="mt-4">
      <h3 class="mt-3">Información de Teléfonos Útiles</h3>
      <ul class="list-group">
        <li
          v-for="telefono in telefonos"
          :key="telefono.id"
          class="list-group-item"
        >
          <strong>Teléfono Útil:</strong> {{ telefono.numero }}
          <br />
          <span>{{ telefono.descripcion }}</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import axios from "axios"; // Importa Axios

export default {
  data() {
    return {
      telefonos: [], // Inicialmente, la lista de teléfonos estará vacía
    };
  },
  mounted() {
    // Realiza una solicitud para obtener la lista de números de teléfono de emergencia desde la API simulada en  local
    axios
      .get("http://127.0.0.1:8081/api/telefonos/")
      .then((response) => {
        this.telefonos = response.data;
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de números de teléfono de emergencia:",
          error
        );
      });
  },

  methods: {
    llamar(numero) {
      if (window.innerWidth <= 768) {
        // Si el dispositivo es un teléfono , activar llamada telefónica
        window.location.href = `tel:${numero}`;
      } else {
        // Si es un dispositivo de escritorio, mostrar el número y descripción
        const telefono = this.telefonos.find((t) => t.numero === numero);
        if (telefono) {
          alert(
            `Número: ${telefono.numero}\nDescripción: ${telefono.descripcion}`
          );
        }
      }
    },
  },
};
</script>
