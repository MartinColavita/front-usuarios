import axios from 'axios';


const apiUrl = 'http://127.0.0.1:8081/api'; // URL de la API

// ------- no estoy usando esto por ahora 
export default {
  // Método para obtener DEA más cercanos
  getDeaCercanos() {
    return axios.get(`${apiUrl}/mapas/`);
  },

  // Método para obtener números de teléfono de emergencia
  getTelefonosUtiles() {
    return axios.get(`${apiUrl}/telefonos/`);
  },
};