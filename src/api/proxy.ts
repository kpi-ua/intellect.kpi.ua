import { CAMPUS_API_URL } from './index';

const FORWARDED_RESPONSE_HEADERS = ['content-type', 'cache-control', 'x-total-count'];

/**
 * Answers a browser request with Campus API's response to the same GET, made from the server.
 */
export const proxyToCampusApi = async (request: Request, path: string): Promise<Response> => {
    const acceptLanguage = request.headers.get('accept-language');

    try {
        const response = await fetch(CAMPUS_API_URL + path + new URL(request.url).search, {
            headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
            cache: 'no-store',
        });

        const headers = new Headers();
        for (const name of FORWARDED_RESPONSE_HEADERS) {
            const value = response.headers.get(name);
            if (value) headers.set(name, value);
        }

        return new Response(response.body, { status: response.status, headers });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 502 });
    }
};
