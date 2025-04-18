import { Division, Subdivision } from './ecampus';
import { AcademicDegree, AcademicStatus } from './enums';

export type Lecturer = {
    profile: string;
    credo: string;
    photo: string;
    fullName: string;
    userIdentifier: string;
    id: number;
    contactRecords: { name: string; value: string }[] | null;
    academicStatus: AcademicStatus;
    academicDegree: AcademicDegree;
    scientificInterest: string;
    items: any[];
    field: any;
    positions: Position[];
};

export type Position = {
    name: string;
    subdivision: Division;
};

export type ExperienceItem = {
    [key in string]: {
        [key in string]: {
            key: string;
            value: string[];
        }[];
    };
};

export type ExperienceType = 'publications' | 'exploration' | 'exploration_results' | 'confs' | 'profile' | 'rating';
export type SearchMode = 'overall' | 'alphabetic' | 'subdivision' | 'interests';
export type SearchParams = 'startsWith' | 'subdivision' | 'interests';

export type TeacherExperience = {
    [key in ExperienceType]: ExperienceItem;
};

export type Rating = {
    subdivision: Subdivision;
    overallRating?: number;
    studyYear: string;
    educationalMethodologicalRating?: number;
    scientificInnovativeRating?: number;
    organizationalEducationalRating?: number;
};

export type Tab = {
    label: string;
    type: SearchMode;
    placeholder?: string;
    tips: boolean;
};
