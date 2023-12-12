import Http from './index';
import { API_BASE_URL } from '../constants';

export const getFaculties = (): Promise<{ name: string }[]> => {
    return Http.get(API_BASE_URL + '/subdivision/faculty/');
};
