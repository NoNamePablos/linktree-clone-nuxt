import axios from 'axios';

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
  axios.defaults.withCredentials = true;
  return {
    provide: {
      axios: axios,
    },
  };
});
