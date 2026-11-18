import { proxyToCampusApi } from '@/api/proxy';

export const dynamic = 'force-dynamic';

// Every path apiFetch can request from the browser: GET /api/intellect/<path> repeats GET /intellect/<path>.
export const GET = async (request: Request, { params }: { params: Promise<{ path: string[] }> }) => {
    const { path } = await params;

    return proxyToCampusApi(request, `/intellect/${path.map(encodeURIComponent).join('/')}`);
};
