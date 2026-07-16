import { Division, Subdivision } from './ecampus';
import { AcademicDegree, AcademicStatus, ContactType } from './enums';

export type Lecturer = {
    credo: string;
    photo: string;
    fullName: string;
    userIdentifier: string;
    id: number;
    contactRecords: ContactRecord[] | null;
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
    employment: EmploymentType;
};

export type ContactRecord = {
    name: string;
    value: string;
    label: string;
    type: ContactType;
};

export enum EmploymentType {
    Unknown = 'Unknown',
    FullTime = 'FullTime',
    PartTime = 'PartTime',
    PartTimeInternal = 'PartTimeInternal',
    PartTimeExternal = 'PartTimeExternal',
    HourlyPay = 'HourlyPay'
};

export type ExperienceType = 'profile' | 'rating';
export type SearchMode = 'all' | 'persons' | 'alphabetic' | 'interests';
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

export type WorkloadSubdivision = Pick<Division, 'bravoId' | 'abbreviation' | 'name'>;

export type EvaluationWorkload = {
    employeeId: string;
    fullName: string;
    subdivision: WorkloadSubdivision;
    subdivisionAbbreviation: string;
    year: number;
    semester: number;
    workOrgFormId: number;
    employment: EmploymentType;
    salary: number;
    educational: number;
    scientific: number;
    methodical: number;
    organizational: number;
    other: number;
    calculatedAt: string;
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
