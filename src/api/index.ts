import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

Http.interceptors.response.use((res) => res.data);

export default Http;
