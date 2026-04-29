import axios, { AxiosInstance } from 'axios';
import { getLocale } from 'next-intl/server';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const getLocaleSafe = async () => {
    if (typeof window !== 'undefined') {
        const pathSegment = window.location.pathname.split('/')[1];
        return LOCALES.includes(pathSegment) ? pathSegment : DEFAULT_LOCALE;
    }

    try {
        return await getLocale();
    } catch {
        return DEFAULT_LOCALE;
    }
};

const attachLocale = (instance: AxiosInstance) => {
    instance.interceptors.request.use(async (config) => {
        const locale = await getLocaleSafe();
        config.headers.set('Accept-Language', locale);
        return config;
    });
};

const Http = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

attachLocale(Http);
Http.interceptors.response.use((res) => res.data);

// Same baseURL and locale handling as Http, but without the response
// interceptor — callers see the full AxiosResponse so they can read
// pagination headers (X-Total-Count etc.).
export const HttpRaw = axios.create({
    baseURL: API_BASE_URL + '/intellect/',
});

attachLocale(HttpRaw);

export default Http;
