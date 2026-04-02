import axios from 'axios';
import { getLocale } from 'next-intl/server';
import { DEFAULT_LOCALE } from '@/i18n/routing';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const getLocaleSafe = async () => {
    try {
        return await getLocale();
    } catch {
        return DEFAULT_LOCALE;
    }
};

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

Http.interceptors.request.use(async (config) => {
    const locale = await getLocaleSafe();
    config.headers.set('Accept-Language', locale);
    return config;
});

Http.interceptors.response.use((res) => res.data);

export default Http;
