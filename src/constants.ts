export const experienceTabs: { [key in Intellect.ExperienceType]: string } = {
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

export const profileTabs: { [key in string]: { field: keyof Intellect.Teacher; label: string }[] } = {
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

export const API_BASE_URL = "https://dev-api.campus.cloud.kpi.ua";
