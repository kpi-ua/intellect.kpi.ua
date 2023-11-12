import axios from 'axios';

const Http = axios.create({
    baseURL: 'https://dev-api.campus.cloud.kpi.ua/intellect/',
});

Http.interceptors.response.use(res => res.data)

export default Http;
