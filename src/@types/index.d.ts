declare module '*.svg';
declare module '*.png';

declare namespace ECampus {
    type Anchor = {
        id: string;
        path: string;
        label: string;
    };

    type Division = {
        id: number;
        name: string;
        url: string;
        logo: string | null;
        address: string | null;
    };

    type ApiResponse<T> = {
        paging: PaginationModel;
        data: T[];
    };

    interface PaginationModel {
        pageNumber: number;
        pageCount: number;
    };

    type Subdivision = {
        id: number;
        name: string;
    };
}

declare namespace Intellect {
    type Teacher = {
        profile: string;
        credo: string;
        photo: string;
        fullName: string;
        userIdentifier: string;
        id: number;
        isConfirmed: boolean;
        contactRecords: { name: string; value: string }[] | null;
        academicStatus: string;
        academicDegree: string;
        scientificInterest: string;
        items: any[];
        status: string;
        field: any;
        positions: Position[];
    };

    type Position = {
        name: string;
        subdivision: ECampus.Division;
    };

    type ExperienceItem = {
        [key in string]: {
            [key in string]: {
                key: string;
                value: string[];
            }[];
        };
    };

    type ExperienceType = 'publications' | 'exploration' | 'exploration_results' | 'confs' | 'profile' | 'rating';
    type SearchMode = 'overall' | 'alphabetic' | 'subdivision' | 'interests';
    type SearchParams = 'startsWith' | 'subdivision' | 'interests';

    type TeacherExperience = {
        [key in ExperienceType]: ExperienceItem;
    };


    type Rating = {
        subdivision: ECampus.Subdivision;
        overallRating?: number;
        studyYear: string;
        educationalMethodologicalRating?: number;
        scientificInnovativeRating?: number;
        organizationalEducationalRating?: number;
    };

    type Tab = {
        label: string;
        type: Intellect.SearchMode;
        placeholder?: string;
        tips: boolean;
    };
}
