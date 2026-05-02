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

type RequestOptions = Omit<RequestInit, 'method'> & { fullResponse?: boolean };

interface HttpResponse<T> {
    data: T;
    headers: Headers;
    status: number;
}

async function get<T>(path: string, options: RequestOptions = {}): Promise<T | HttpResponse<T>> {
    const { fullResponse, headers: initHeaders, ...rest } = options;
    const headers = new Headers(initHeaders);
    headers.set('Accept-Language', await getLocaleSafe());

    const url = /^https?:\/\//i.test(path) ? path : `${API_BASE_URL}/intellect/${path.replace(/^\//, '')}`;
    const res = await fetch(url, { ...rest, headers });

    if (!res.ok) throw new Error(`HTTP ${res.status} for GET ${path}`);

    const data = (await res.json()) as T;
    return fullResponse ? { data, headers: res.headers, status: res.status } : data;
}

const Http = { get } as {
    get<T>(path: string, options: RequestOptions & { fullResponse: true }): Promise<HttpResponse<T>>;
    get<T>(path: string, options?: RequestOptions): Promise<T>;
};

export default Http;
