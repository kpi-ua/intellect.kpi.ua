import axios from 'axios';

const Http = axios.create({
    baseURL: 'https://api.campus.kpi.ua/Intellect/',
});

Http.interceptors.response.use(res => res.data)

export default Http;
