import { WorkloadCategory } from './types';

export const WORKLOAD_CATEGORIES: Array<{
    key: WorkloadCategory;
    color: string;
    label: string;
}> = [
        { key: 'educational', color: '#1C396E', label: 'Навчальне' },
        { key: 'scientific', color: '#2D5A9E', label: 'Наукове' },
        { key: 'methodical', color: '#4A7AC7', label: 'Методичне' },
        { key: 'organizational', color: '#7BA3E0', label: 'Організаційне' },
        { key: 'other', color: '#B0C9F0', label: 'Інше' },
    ];
