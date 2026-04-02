import axios from 'axios';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

Http.interceptors.request.use((config) => {
    let locale = DEFAULT_LOCALE;

    if (typeof window !== 'undefined') {
        const pathSegment = window.location.pathname.split('/')[1];
        if (LOCALES.includes(pathSegment)) {
            locale = pathSegment;
        }
    }

    config.headers.set('Accept-Language', locale);
    return config;
});

Http.interceptors.response.use((res) => res.data);

export default Http;
