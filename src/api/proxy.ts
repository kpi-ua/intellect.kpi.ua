import { getCampusApiUrl } from './index';

const FORWARDED_REQUEST_HEADERS = ['accept', 'accept-language', 'x-forwarded-for'];
const FORWARDED_RESPONSE_HEADERS = ['content-type', 'cache-control', 'x-total-count', 'location'];
const UPSTREAM_TIMEOUT_MS = 30_000;

const copyHeaders = (source: Headers, names: string[]) => {
    const headers = new Headers();
    for (const name of names) {
        const value = source.get(name);
        if (value) headers.set(name, value);
    }
    return headers;
};

/**
 * Answers a browser request with Campus API's response to the same GET, made from the server.
 * Redirects are passed back to the caller rather than followed.
 */
export const proxyToCampusApi = async (request: Request, path: string): Promise<Response> => {
    try {
        const response = await fetch(getCampusApiUrl() + path + new URL(request.url).search, {
            headers: copyHeaders(request.headers, FORWARDED_REQUEST_HEADERS),
            cache: 'no-store',
            redirect: 'manual',
            signal: AbortSignal.any([request.signal, AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)]),
        });

        return new Response(response.body, {
            status: response.status,
            headers: copyHeaders(response.headers, FORWARDED_RESPONSE_HEADERS),
        });
    } catch (error) {
        if (!request.signal.aborted) console.error(error);
        return new Response(null, { status: 502 });
    }
};
