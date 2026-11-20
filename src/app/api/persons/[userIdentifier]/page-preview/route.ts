import { getPagePreview } from '@/api/teacher';

const PASSED_HEADERS = ['content-type', 'cache-control', 'location'];

// The Open Graph image of a profile. Campus API answers with a redirect, which is passed back to the caller.
export const GET = async (_request: Request, { params }: { params: Promise<{ userIdentifier: string }> }) => {
    const { userIdentifier } = await params;

    try {
        const response = await getPagePreview(userIdentifier);

        const headers = new Headers();
        for (const name of PASSED_HEADERS) {
            const value = response.headers.get(name);
            if (value) headers.set(name, value);
        }

        return new Response(response.body, { status: response.status, headers });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 502 });
    }
};
