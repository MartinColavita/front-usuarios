<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Aplicación de Emergencia</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/mapa" class="nav-link">Mapas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/telefonos-utiles" class="nav-link">Teléfonos Útiles</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  