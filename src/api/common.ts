import { apiFetch } from '@/api/index';

export const getHintByQueryString = async (q: string): Promise<Record<string, string[]>> => {
    const response = await apiFetch<Record<string, string[]>>('v2/hint?q=' + q);
    if (!response.ok) throw new Error(`${response.status} Error`);
    return response.json();
};
