import { Division, Subdivision } from './ecampus';
import { AcademicDegree, AcademicStatus } from './enums';

export type Lecturer = {
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
    subdivisionAbbreviation: string;
    subdivision: Division;
    employment: number;
};

export type ExperienceType = 'profile' | 'rating';
export type SearchMode = 'overall' | 'alphabetic' | 'interests';
export type SearchParams = 'startsWith' | 'subdivision' | 'interests';

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

export type EvaluationWorkload = {
    employeeId: string;
    fullName: string;
    subdivision: Division;
    subdivisionAbbreviation: string;
    year: number;
    semester: number;
    salary: number;
    educational: number;
    scientific: number;
    methodical: number;
    organizational: number;
    other: number;
    totalHours: number;
    totalWorkload: number;
    educationalPercentage: number;
    scientificPercentage: number;
    methodicalPercentage: number;
    organizationalPercentage: number;
    otherPercentage: number;
    isEducationalValid: boolean;
    isScientificValid: boolean;
    isOtherValid: boolean;
    isValid: boolean;
};
