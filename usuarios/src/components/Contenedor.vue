<template>
    <div class="container">
      <div class="content-container">
        <!-- Contenido de la vista actual -->
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .content-container {
    margin: 20px;
  }
  </style>
  