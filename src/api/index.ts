import axios from 'axios';

export const API_BASE_URL = 'https://api.campus.kpi.ua';

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

Http.interceptors.response.use((res) => res.data);

export default Http;
