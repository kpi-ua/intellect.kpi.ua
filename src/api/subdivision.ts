import { apiFetch, API_BASE_URL } from './index';

export const getFaculties = async (): Promise<{ name: string }[]> => {
    const response = await apiFetch<{ name: string }[]>(API_BASE_URL + '/subdivision/faculty/');
    if (!response.ok) throw new Error(`${response.status} Error`);
    const faculties = await response.json();
    return faculties.map((faculty) => faculty.name) as any;
};
