import axios from 'axios';

const Http = axios.create({
    baseURL: process.env.API_BASE_URL + '/intellect/',
});

Http.interceptors.response.use((res) => res.data);

export default Http;
