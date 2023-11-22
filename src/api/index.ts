import axios from 'axios';
import { API_BASE_URL } from '../constants';

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

Http.interceptors.response.use((res) => res.data);

export default Http;
