import Http from './index'
import {parseSearchParams} from "../utils";

type ExperienceResultPromise = Promise<ECampus.ApiResponse<Intellect.ExperienceItem>>

export const searchByInput = (input: string): Promise<ECampus.ApiResponse<Intellect.Teacher>> => {
    const params = parseSearchParams(input);
    let searchString = '?'

    if (params.startsWith) {
        searchString += '&startsWith=' + params.startsWith;
    } else if (params.subdivision)  {
        searchString += '&subdivision=' + params.subdivision;
    } else if (params.interests) {
        searchString += '&interests=' + params.interests;
    } else {
        searchString += '&value=' + input;
    }

    return Http.get('/v2/find' + searchString);
}

const getPublications = (teacherId: string, key: Intellect.ExperienceType): ExperienceResultPromise  => {
    return Http.get(`/v2/persons/${teacherId}/publications`)
}

const getConferences = (teacherId: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/conferences`);
}

const getKRExecutions = (teacherId: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/researches/carrying-out`);
}

const getKRResults = (teacherId: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get(`/v2/persons/${teacherId}/researches/results`);
}

export const getExperienceByTeacherId = async (teacherId: string): Promise<Intellect.TeacherExperience> => {
    const resultObj: any = {
        publications: [],
        exploration: [],
        exploration_results: [],
        confs: [],
    }

    try {
        const results = await Promise.all<ExperienceResultPromise>([
            getPublications(teacherId, 'publications'),
            getKRExecutions(teacherId, 'exploration'),
            getKRResults(teacherId, 'exploration_results'),
            getConferences(teacherId, 'confs'),
        ])

        Object.keys(resultObj).forEach((item, idx) => {
            resultObj[item] = results[idx];
        })
    } catch (e: any) {
        throw new Error(e)
    }

    return resultObj;
}

export const getTeacherByTeacherId = (teacherId: string): Promise<Intellect.Teacher> => {
    return Http.get('https://dev-api.campus.cloud.kpi.ua/account/public/' + teacherId);
}
