import Http from './index'

type ExperienceResultPromise = Promise<ECampus.ApiResponse<Intellect.ExperienceItem>>

export const searchByInput = (input: string): Promise<ECampus.ApiResponse<Intellect.Teacher>> => {
    const searchString = '?value=' + input;
    return Http.get('/Find' + searchString);
}

const getPublications = (searchString: string, key: Intellect.ExperienceType): ExperienceResultPromise  => {
    return Http.get('/publications' + searchString)
}

const getConferences = (searchString: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get('/conferences' + searchString);
}

const getKRExecutions = (searchString: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get('/KRExecutions' + searchString);
}

const getKRResults = (searchString: string, key: Intellect.ExperienceType): ExperienceResultPromise => {
    return Http.get('/KRResults' + searchString);
}

export const getExperienceByTeacherId = async (teacherId: string): Promise<Intellect.TeacherExperience> => {
    const searchString = '?userIdentifier=' + teacherId;
    const resultObj: any = {
        publications: [],
        exploration: [],
        exploration_results: [],
        confs: [],
    }

    try {
        const results = await Promise.all<ExperienceResultPromise>([
            getPublications(searchString, 'publications'),
            getKRExecutions(searchString, 'exploration'),
            getKRResults(searchString, 'exploration_results'),
            getConferences(searchString, 'confs'),
        ])

        Object.keys(resultObj).forEach((item, idx) => {
            resultObj[item] = results[idx].Data;
        })
    } catch (e: any) {
        throw new Error(e)
    }

    return resultObj;
}
