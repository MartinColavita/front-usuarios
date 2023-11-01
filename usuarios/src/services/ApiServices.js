import axios from 'axios';


const apiUrl = 'URL_DE_TU_API_JAVA'; // Reemplaza con la URL de tu API Java


export default {
  // Método para obtener DEA más cercanos
  getDeaCercanos() {
    return axios.get(`${apiUrl}/ruta_de_la_api_para_dea`);
  },

  // Método para obtener números de teléfono de emergencia
  getTelefonosUtiles() {
    return axios.get(`${apiUrl}/ruta_de_la_api_para_telefonos_utiles`);
  },
};