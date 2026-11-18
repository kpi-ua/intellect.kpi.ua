import { proxyToCampusApi } from '@/api/proxy';

export const dynamic = 'force-dynamic';

export const GET = (request: Request) => proxyToCampusApi(request, '/intellect/v2/find');
