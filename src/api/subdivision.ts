import Http, { API_BASE_URL } from './index';

export const getFaculties = (): Promise<{ name: string }[]> => {
    return Http.get(API_BASE_URL + '/subdivision/faculty/')
        .then((response: any) => response.map((faculty: { name: string; }) => faculty.name));
};
