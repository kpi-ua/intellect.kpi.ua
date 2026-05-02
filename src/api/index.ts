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

export const apiFetch = async <T = unknown>(
    url: string | URL,
    options: RequestInit = {},
): Promise<TypedResponse<T>> => {
    const { headers, ...otherOptions } = options;
    const locale = await getLocaleSafe();

    const input = new URL(url, API_BASE_URL + '/intellect/').href;

    const mergedHeaders = new Headers(headers);
    if (!mergedHeaders.has('Accept')) mergedHeaders.set('Accept', 'application/json');
    if (!mergedHeaders.has('Content-Type')) mergedHeaders.set('Content-Type', 'application/json');
    mergedHeaders.set('Accept-Language', locale);

    return fetch<T>(input, {
        ...otherOptions,
        headers: mergedHeaders,
    });
};
