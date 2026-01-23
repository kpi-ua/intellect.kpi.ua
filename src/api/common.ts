import Http from '@/api/index';

export const getHintByQueryString = (q: string): Promise<Record<string, string[]>> => {
    return Http.get('/v2/hint?q=' + q);
};
