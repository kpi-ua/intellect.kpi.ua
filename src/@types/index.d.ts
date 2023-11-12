declare module "*.svg"
declare module "*.png"

declare module ECampus {
    type Anchor = {
        id: string,
        path: string,
        label: string,
    }

    type Division = {
        id: number,
        name: string,
        url: string,
        logo: string | null,
        address: string | null
    }

    type ApiResponse<T> = {
        paging: object,
        data: T[]
    }
}

declare module Intellect {
    type Teacher = {
        profile: string,
        credo: string,
        photo: string,
        fullName: string,
        userIdentifier: string,
        id: number,
        isConfirmed: boolean,
        contactRecords: {name: string, value: string}[] | null,
        academicStatus: string,
        academicDegree: string,
        scientificInterests: string,
        items: any[],
        status: string,
        field: any,
        positions: Position[]
    }

    type Position = {
        name: string,
        subdivision: ECampus.Division,
    }

    type ExperienceItem = {
        [key in string]: {
            [key in string]: {
                Key: string,
                Value: string[]
            }[]
        }
    }

    type ExperienceType =  'publications' | 'exploration' | 'exploration_results' | 'confs';
    type SearchMode = 'overall' | 'alphabetic' | 'subdivision' | 'interests';
    type SearchParams = 'startsWith' | 'subdivision' | 'interests';

    type TeacherExperience = {
        [key in ExperienceType]: ExperienceItem
    }
}
