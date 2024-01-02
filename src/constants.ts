import { getByQueryString as searchTeachers } from '@/api/teacher';
import { getByQueryString as searchDivision } from '@/api/subdivision';

type Tab = {
    label: string;
    type: Intellect.SearchMode;
    placeholder?: string;
    searchFetchFunction?: (q: string) => Promise<string[]>;
};

export const experienceTabs: Record<Intellect.ExperienceType, string> = {
    profile: 'Профіль',
    publications: 'Публікації',
    exploration: 'Виконання науково-дослідних та дослідно-конструкторських робіт',
    exploration_results: 'Результати виконання науково-дослідних та дослідно-конструкторських робіт',
    confs: 'Конференції, виставки',
};

export const searchStringParams = {
    STARTS_WITH: 'startsWith:',
    SUBDIVISION: 'subdivision:',
    INTERESTS: 'interests:',
};

export const profileTabs: Record<string, { field: keyof Intellect.Teacher; label: string }[]> = {
    'Загальна інформація': [
        {
            field: 'scientificInterest' as keyof Intellect.Teacher,
            label: 'Наукові інтереси',
        },
        {
            field: 'academicStatus' as keyof Intellect.Teacher,
            label: 'Вчене звання',
        },
        {
            field: 'academicDegree' as keyof Intellect.Teacher,
            label: 'Науковий ступінь',
        },
    ],
};

// export const API_BASE_URL = 'https://dev-api.campus.cloud.kpi.ua';

export const tabs = [
    {
        label: 'Загальний пошук спiвробiтникiв',
        type: 'overall',
        placeholder: 'Введіть ПІБ особи.. (наприклад: Петров Петро Петрович)',
        searchFetchFunction: (searchField: string) => searchTeachers(searchField),
    },
    { label: 'Алфавітний покажчик', type: 'alphabetic' },
    {
        label: 'За кафедрами та факультетами',
        type: 'subdivision',
        placeholder: 'Введіть кафедру або факультет.. (наприклад: ФІОТ)',
        searchFetchFunction: (searchField: string) => searchDivision(searchField),
    },
    {
        label: 'За інтересами',
        type: 'interests',
        placeholder: 'Введіть можливі інтереси.. (наприклад: програмування)',
    },
] as Tab[];
