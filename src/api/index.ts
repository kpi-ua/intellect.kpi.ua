import { getLocale } from 'next-intl/server';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// The server reads its in-cluster address at run time; the browser has no access to Campus API and goes through
// this application's own /api/intellect routes.
export const getCampusApiUrl = () => (process.env.CAMPUS_API_URL || API_BASE_URL).replace(/\/+$/, '');

const getRequestBaseUrl = () => (typeof window === 'undefined' ? getCampusApiUrl() : window.location.origin + '/api');

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

    const input = new URL(url, getRequestBaseUrl() + '/intellect/').href;

    const mergedHeaders = new Headers(headers);
    if (!mergedHeaders.has('Accept')) mergedHeaders.set('Accept', 'application/json');
    if (!mergedHeaders.has('Content-Type')) mergedHeaders.set('Content-Type', 'application/json');
    mergedHeaders.set('Accept-Language', locale);

    return fetch<T>(input, {
        ...otherOptions,
        headers: mergedHeaders,
    });
};
