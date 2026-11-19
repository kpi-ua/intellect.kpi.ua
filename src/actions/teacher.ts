'use server';

import { searchByInput } from '@/api/teacher';
import { ApiResponse } from '@/types/ecampus';
import { Lecturer } from '@/types/intellect';

const MAX_QUERY_LENGTH = 200;

export const searchTeachers = async (input: string, page: number): Promise<ApiResponse<Lecturer>> => {
    // A server action is a public endpoint: its arguments come from the browser unchecked.
    if (typeof input !== 'string' || !Number.isInteger(page) || page < 1) {
        throw new Error('Invalid search request');
    }

    return searchByInput(input.slice(0, MAX_QUERY_LENGTH), page);
};
