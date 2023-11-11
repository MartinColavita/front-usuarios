<template>
  <div class="container">
    <!-- Estilo para el título -->
    <h1 class="titulo">Bienvenido a la Aplicación de Emergencias</h1>
    <!-- Utilizamos clases flexbox para centrar y alinear los botones -->
    <div class="d-flex justify-content-center align-items-center flex-column">
      <div class="mb-3">
        <!-- Botones "Ver Mapa con los DEAS mas cercanos" y "Teléfonos Útiles" -->
        <router-link to="/mapa" class="btn btn-primary btn-lg btn-custom"
          >Ver Mapa con Deas
        </router-link>
        <router-link
          to="/telefonos-utiles"
          class="btn btn-primary btn-lg btn-custom"
          >Teléfonos Útiles</router-link
        >
      </div>
      <div>
        <!-- Botón "Boton de emergencia" -->
        <router-link to="/emergencias" class="btn btn-danger btn-lg"
          >Boton de emergencia</router-link
        >
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* Estilo para el título */
.titulo {
  font-size: 38px; /* Tamaño del título */
  margin-bottom: 20px; /* Espacio entre el título y los botones */
  color: #007bff; /* Color del título */
}

.btn-custom {
  flex: 1; /* Distribución equitativa del espacio entre los botones */
  min-width: 200px; /* Ancho mínimo de los botones */
  margin: 5px; /* Espacio entre los botones */
}
</style>
