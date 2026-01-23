import { AcademicDegree, AcademicStatus } from './types/enums';
import { ExperienceType, Tab } from './types/intellect';

export const CDN_IMG_BASE = 'https://do4rt9wur3t6m.cloudfront.net/intellect.kpi.ua/img';

export const experienceTabs: Record<ExperienceType, string> = {
    profile: 'Профіль',
    rating: 'Оцінювання НПП',
};

export const searchStringParams = {
    STARTS_WITH: 'startsWith:',
    SUBDIVISION: 'subdivision:',
    INTERESTS: 'interests:',
};

export const academicDegrees = {
    [AcademicDegree.None]: 'Не вказано',
    [AcademicDegree.CandidateOfSciences]: 'Кандидат наук',
    [AcademicDegree.DoctorOfSciences]: 'Доктор наук',
    [AcademicDegree.PhD]: 'Доктор філософії',
};

export const academicStatuses = {
    [AcademicStatus.None]: 'Не вказано',
    [AcademicStatus.Professor]: 'Професор',
    [AcademicStatus.SeniorResearchAssociate]: 'Старший науковий співробітник',
    [AcademicStatus.AssociateProfessor]: 'Доцент',
    [AcademicStatus.SeniorResearcher]: 'Старший дослідник',
};

export const tabs = [
    {
        label: 'Загальний пошук',
        type: 'overall',
        placeholder: 'Введіть ПІБ особи, наприклад: Петренко Петро Петрович',
        tips: true,
    },
    { label: 'За алфавітом', type: 'alphabetic' },
    {
        label: 'За інтересами',
        type: 'interests',
        placeholder: 'Введіть можливі інтереси, наприклад: програмування',
        tips: true,
    },
] as Tab[];

export const hintLabels: Record<string, string> = {
    persons: 'Викладачі',
    subdivisions: 'Підрозділи',
    interests: 'Наукові інтереси',
};
