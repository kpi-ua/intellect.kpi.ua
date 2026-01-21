import { ApiResponse } from '@/types/ecampus';
import Http, { API_BASE_URL } from './index';

import { parseSearchParams } from '@/utils';
import { Rating, Lecturer } from '@/types/intellect';

export const searchByInput = (input: string, currentPage: number): Promise<ApiResponse<Lecturer>> => {
  const params = parseSearchParams(input);
  let searchString = '?';

  if (params.startsWith) {
    searchString += '&startsWith=' + params.startsWith;
  } else {
    searchString += '&value=' + input;
  }

  return Http.get('/v2/find' + searchString + `&pageNumber=${currentPage}`);
};

export const getTeacherByTeacherId = (teacherId: string): Promise<Lecturer> => {
  return Http.get(API_BASE_URL + '/account/public/' + teacherId);
};

export const getInterests = (limit?: number): Promise<string[]> => {
  const param = limit ? `?count=${limit}` : '';
  return Http.get('/v2/scientific-interests' + param);
};

export const getRatings = (teacherId: string): Promise<Rating[]> => {
  return Http.get(`/v2/persons/${teacherId}/rating`);
};