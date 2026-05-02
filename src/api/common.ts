import Http from '@/api/index';

export const getHintByQueryString = (q: string): Promise<Record<string, string[]>> => {
    return Http.get<Record<string, string[]>>('/v2/hint?q=' + q);
};
