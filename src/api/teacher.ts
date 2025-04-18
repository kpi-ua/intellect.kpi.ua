import { ApiResponse } from '@/types/ecampus';
import Http, { API_BASE_URL } from './index';

import { parseSearchParams } from '@/utils';
import { ExperienceItem, Rating, Teacher, TeacherExperience } from '@/types/intellect';

type ExperienceResultPromise = Promise<ApiResponse<ExperienceItem>>;

export const searchByInput = (input: string, currentPage: number): Promise<ApiResponse<Teacher>> => {
    const params = parseSearchParams(input);
    let searchString = '?';

    if (params.startsWith) {
        searchString += '&startsWith=' + params.startsWith;
    } else {
        searchString += '&value=' + input;
    }

    return Http.get('/v2/find' + searchString + `&pageNumber=${currentPage}`);
};

const getPublications = (teacherId: string): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/publications`);
};

const getConferences = (teacherId: string): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/conferences`);
};

const getKRExecutions = (teacherId: string): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/researches/carrying-out`);
};

const getKRResults = (teacherId: string): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/researches/results`);
};

export const getExperienceByTeacherId = async (teacherId: string): Promise<TeacherExperience> => {
    const resultObj: any = {
        publications: [],
        exploration: [],
        exploration_results: [],
        confs: [],
    };

    try {
        const results = await Promise.all<ExperienceResultPromise>([
            getPublications(teacherId),
            getKRExecutions(teacherId),
            getKRResults(teacherId),
            getConferences(teacherId),
        ]);

        Object.keys(resultObj).forEach((item, idx) => {
            resultObj[item] = results[idx];
        });
    } catch (e: any) {
        throw new Error(e);
    }

    return resultObj;
};

export const getTeacherByTeacherId = (teacherId: string): Promise<Teacher> => {
    return Http.get(API_BASE_URL + '/account/public/' + teacherId);
};

export const getInterests = (limit?: number): Promise<string[]> => {
    const param = limit ? `?count=${limit}` : '';
    return Http.get('/v2/scientific-interests' + param);
};

export const getRatings = (teacherId: string): Promise<Rating[]> => {
    return Http.get(`/v2/persons/${teacherId}/rating`);
};

export default {
    getExperienceByTeacherId,
    getTeacherByTeacherId,
    getInterests,
    getRatings,
};
