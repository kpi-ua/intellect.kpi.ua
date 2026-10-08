import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isScientificBelowMinimum } from './utils';

export const ScientificWorkloadWarning = ({ hours, total }: { hours: number; total: number }) => {
    const t = useTranslations('profile.workload');
    if (!isScientificBelowMinimum(hours, total)) return null;
    const description = t('scientific_minimum_warning');
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    className="ml-1 inline-flex shrink-0 cursor-help items-center align-middle rounded-sm text-[#D14360] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D14360]"
                    aria-label={description}
                >
                    <TriangleAlert size={16} fill="currentColor" stroke="white" aria-hidden="true" />
                </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-center font-normal">
                <p>{description}</p>
            </TooltipContent>
        </Tooltip>
    );
};
