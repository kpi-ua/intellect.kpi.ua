import Http, { API_BASE_URL } from './index';

export const getFaculties = (): Promise<{ name: string }[]> => {
    return Http.get(API_BASE_URL + '/subdivision/faculty/')
        .then((response: any) => {
            return response.map((faculty: { name: string; }) => faculty.name);
        });

};

export const getByQueryString = (q: string): Promise<string[]> => {
    return Http.get(API_BASE_URL + '/subdivision?q=' + q)
        .then((response: any) => {
            return response.map((department: { name: string; }) => department.name);
        });
};