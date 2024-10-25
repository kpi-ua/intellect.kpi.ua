import { getFaculties } from '@/api/subdivision';
import { getInterests } from '@/api/teacher';

export const experienceTabs: Record<Intellect.ExperienceType, string> = {
    profile: 'Профіль',
    publications: 'Публікації',
    exploration: 'Виконання НДДКР*',
    exploration_results: 'Результати виконання НДДКР*',
    confs: 'Конференції, виставки',
    rating: 'Рейтинг',
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

export const tabs = [
    {
        label: 'Загальний пошук спiвробiтникiв',
        type: 'overall',
        placeholder: 'Введіть ПІБ особи, наприклад: Петренко Петро Петрович',
        tips: true,
    },
    { label: 'Алфавітний покажчик', type: 'alphabetic' },
    {
        label: 'За кафедрами та факультетами',
        type: 'subdivision',
        placeholder: 'Введіть кафедру або факультет, наприклад: ФІОТ',
        tips: true,
    },
    {
        label: 'За інтересами',
        type: 'interests',
        placeholder: 'Введіть можливі інтереси, наприклад: програмування',
        tips: true,
    },
] as Intellect.Tab[];

export const tagsOptions = [
    {
        title: 'Список підрозділів',
        subtitle: 'Список інститутів та факультетів',
        fetchFunction: getFaculties,
        lazy: false,
    },
    {
        title: 'Наукові інтереси',
        subtitle: 'Список можливих інтересів і захоплень викладачів',
        fetchFunction: getInterests,
        lazy: true,
    },
];

export const hintLabels: Record<string, string> = {
    persons: 'Викладачі',
    subdivisions: 'Підрозділи',
    interests: 'Наукові інтереси',
};
