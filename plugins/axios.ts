import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
     axios.defaults.baseURL = 'http://localhost:8000'
      axios.defaults.withCredentials = true;
      axios.interceptors.request.use((config) => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        const cookies = '; ' + document.cookie
        const parts = cookies.split('; ' + name + '=')
        const value = parts.length == 2 ? parts.pop().split(';').shift() : null
        const csrfToken = value;
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = value;
        }
        return config;
    });
    return {
        provide: { 
            axios: axios
        },
    }
})