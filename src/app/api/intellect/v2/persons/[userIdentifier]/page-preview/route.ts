import { proxyToCampusApi } from '@/api/proxy';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request, { params }: { params: Promise<{ userIdentifier: string }> }) => {
    const { userIdentifier } = await params;

    return proxyToCampusApi(request, `/intellect/v2/persons/${encodeURIComponent(userIdentifier)}/page-preview`);
};
