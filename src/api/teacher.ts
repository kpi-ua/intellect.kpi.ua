import { ApiResponse } from '@/types/ecampus';
import { apiFetch } from './index';

import { parseSearchParams } from '@/utils';
import { Rating, Lecturer, EvaluationWorkload } from '@/types/intellect';

const SEARCH_PAGE_SIZE = 30;

export const searchByInput = async (input: string, currentPage: number): Promise<ApiResponse<Lecturer>> => {
    const { startsWith } = parseSearchParams(input);
    const query = new URLSearchParams(startsWith ? { startsWith } : { value: input });
    query.set('pageNumber', String(currentPage));
    query.set('pageSize', String(SEARCH_PAGE_SIZE));

    const response = await apiFetch<Lecturer[]>(`v2/find?${query}`);
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

const PAGE_PREVIEW_TIMEOUT_MS = 10_000;

export const getPagePreview = async (userIdentifier: string): Promise<Response> =>
    apiFetch(`v2/persons/${encodeURIComponent(userIdentifier)}/page-preview`, {
        headers: { Accept: 'image/*' },
        redirect: 'manual',
        signal: AbortSignal.timeout(PAGE_PREVIEW_TIMEOUT_MS),
    });
