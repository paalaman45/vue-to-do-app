import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
    // Default
    // baseURL: import.meta.env.VITE_BASE_URL,

    //For Netlify Only
    baseURL: 'http://laravel-api-10052023.atwebpages.com',
})

export default api