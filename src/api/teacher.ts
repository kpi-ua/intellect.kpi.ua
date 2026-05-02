import { ApiResponse } from '@/types/ecampus';
import Http from './index';

import { parseSearchParams } from '@/utils';
import { Rating, Lecturer, EvaluationWorkload } from '@/types/intellect';

// Backend returns the page as a plain array and exposes the total row
// count via the X-Total-Count header. Keep the pageSize the client uses
// pinned here so pageCount math stays internally consistent.
const SEARCH_PAGE_SIZE = 30;

export const searchByInput = async (input: string, currentPage: number): Promise<ApiResponse<Lecturer>> => {
    const params = parseSearchParams(input);
    let searchString = '?';

    if (params.startsWith) {
        searchString += '&startsWith=' + params.startsWith;
    } else {
        searchString += '&value=' + input;
    }

    const response = await Http.get<Lecturer[]>(
        '/v2/find' + searchString + `&pageNumber=${currentPage}&pageSize=${SEARCH_PAGE_SIZE}`,
        { fullResponse: true },
    );

    const totalCount = parseInt(response.headers.get('x-total-count') ?? '0', 10);
    const pageCount = totalCount > 0 ? Math.ceil(totalCount / SEARCH_PAGE_SIZE) : 0;

    return {
        data: response.data,
        paging: { pageNumber: currentPage, pageCount },
    };
};

export const getTeacherByTeacherId = (teacherId: string): Promise<Lecturer> => {
    return Http.get<Lecturer>(`/v2/profile/${teacherId}`);
};

export const getRatings = (teacherId: string): Promise<Rating[]> => {
    return Http.get<Rating[]>(`/v2/persons/${teacherId}/rating`);
};

export const getEvaluationWorkloads = (userIdentifier: string): Promise<EvaluationWorkload[]> => {
    return Http.get<EvaluationWorkload[]>(`/v2/persons/${userIdentifier}/evaluation-workloads`);
};
