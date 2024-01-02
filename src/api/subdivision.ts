import Http, { API_BASE_URL } from './index';

export const getFaculties = (): Promise<{ name: string }[]> => {
    return Http.get(API_BASE_URL + '/subdivision/faculty/');
};

export const getByQueryString = (q: string): Promise<string[]> => {
    return Http.get('/subdivision?q=' + q);
};
