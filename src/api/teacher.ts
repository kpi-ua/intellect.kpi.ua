import { ApiResponse } from '@/types/ecampus';
import { apiFetch } from './index';

import { parseSearchParams } from '@/utils';
import { Rating, Lecturer, EvaluationWorkload } from '@/types/intellect';

const SEARCH_PAGE_SIZE = 30;

export const searchByInput = async (input: string, currentPage: number): Promise<ApiResponse<Lecturer>> => {
    const params = parseSearchParams(input);
    let searchString = '?';

    if (params.startsWith) {
        searchString += '&startsWith=' + params.startsWith;
    } else {
        searchString += '&value=' + input;
    }

    const response = await apiFetch<Lecturer[]>(
        'v2/find' + searchString + `&pageNumber=${currentPage}&pageSize=${SEARCH_PAGE_SIZE}`,
    );
    if (!response.ok) throw new Error(`${response.status} Error`);

    const totalCount = parseInt(response.headers.get('x-total-count') ?? '0', 10);
    const pageCount = totalCount > 0 ? Math.ceil(totalCount / SEARCH_PAGE_SIZE) : 0;
    const data = await response.json();

    return {
        data,
        paging: { pageNumber: currentPage, pageCount },
    };
};

export const getTeacherByTeacherId = async (teacherId: string): Promise<Lecturer> => {
    const response = await apiFetch<Lecturer>(`v2/profile/${teacherId}`);
    if (!response.ok) throw new Error(`${response.status} Error`);
    return response.json();
};

export const getRatings = async (teacherId: string): Promise<Rating[]> => {
    const response = await apiFetch<Rating[]>(`v2/persons/${teacherId}/rating`);
    if (!response.ok) throw new Error(`${response.status} Error`);
    return response.json();
};

export const getEvaluationWorkloads = async (userIdentifier: string): Promise<EvaluationWorkload[]> => {
    const response = await apiFetch<EvaluationWorkload[]>(
        `v2/persons/${userIdentifier}/evaluation-workloads`,
    );
    if (!response.ok) throw new Error(`${response.status} Error`);
    return response.json();
};
