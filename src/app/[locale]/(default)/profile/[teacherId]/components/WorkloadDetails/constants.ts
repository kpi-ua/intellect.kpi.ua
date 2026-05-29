import { WorkloadCategory } from './types';
import { EmploymentType } from '@/types/intellect';

export const WORKLOAD_CATEGORIES: Array<{
    key: WorkloadCategory;
    color: string;
    label: string;
}> = [
        { key: 'educational', color: '#1C396E', label: 'Навчальна' },
        { key: 'scientific', color: '#2D5A9E', label: 'Наукова' },
        { key: 'methodical', color: '#4A7AC7', label: 'Методична' },
        { key: 'organizational', color: '#7BA3E0', label: 'Організаційна' },
        { key: 'other', color: '#B0C9F0', label: 'Інші' },
    ];


export const EMPLOYMENT_ABBREVIATION: Record<EmploymentType, string> = {
    [EmploymentType.FullTime]: 'PA',
    [EmploymentType.PartTime]: 'SA',
    [EmploymentType.PartTimeInternal]: 'SA',
    [EmploymentType.PartTimeExternal]: 'SA',
    [EmploymentType.HourlyPay]: 'HA',
    [EmploymentType.Unknown]: '',
};
