import { ApiResponse } from '@/types/ecampus';
import Http from './index';

import { parseSearchParams } from '@/utils';
import { Rating, Lecturer, EvaluationWorkload } from '@/types/intellect';

const localeHeaders = (locale?: string) =>
    locale ? { headers: { 'Accept-Language': locale } } : undefined;

export const searchByInput = (input: string, currentPage: number, locale?: string): Promise<ApiResponse<Lecturer>> => {
    const params = parseSearchParams(input);
    let searchString = '?';

    if (params.startsWith) {
        searchString += '&startsWith=' + params.startsWith;
    } else {
        searchString += '&value=' + input;
    }

    return Http.get('/v2/find' + searchString + `&pageNumber=${currentPage}`, localeHeaders(locale));
};

export const getTeacherByTeacherId = (teacherId: string, locale?: string): Promise<Lecturer> => {
    return Http.get(`/v2/profile/${teacherId}`, localeHeaders(locale));
};

export const getRatings = (teacherId: string, locale?: string): Promise<Rating[]> => {
    return Http.get(`/v2/persons/${teacherId}/rating`, localeHeaders(locale));
};

export const getEvaluationWorkloads = (userIdentifier: string, locale?: string): Promise<EvaluationWorkload[]> => {
    return Http.get(`/v2/persons/${userIdentifier}/evaluation-workloads`, localeHeaders(locale));
};
