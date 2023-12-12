import Http from './index';

export const getFaculties = (): Promise<{ name: string }[]> => {
    return Http.get('https://dev-api.campus.cloud.kpi.ua/subdivision/faculty');
};
