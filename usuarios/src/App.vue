<template>
  <div id="app">
    <!-- Navbar de Bootstrap -->
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light justify-content-center"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/mapa" class="nav-link"
              >Ver Mapa con los DEAS</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/telefonos-utiles" class="nav-link"
              >Teléfonos Útiles</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/emergencias" class="nav-link"
              >Boton de emergencia</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- Rutas de la aplicación envueltas en el contenedor personalizado -->
    <Contenedor>
      <router-view></router-view>
    </Contenedor>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Estilos adicionales para el Navbar y el contenido */
.navbar {
  /* Elimina el margen inferior para que el Navbar no se superponga con el contenido */
  margin-bottom: 0;
}

/* Añade márgenes automáticos a los elementos del Navbar para centrarlos en la pantalla */
.navbar-toggler {
  margin: 0 auto;
}

.navbar-nav {
  margin: 0 auto;
  text-align: center;
}
</style>
