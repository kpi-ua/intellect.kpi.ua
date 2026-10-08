import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export const CapIndicator = ({ raw, credited }: { raw: number; credited: number }) => {
    const t = useTranslations('profile.workload.caps');
    if (raw <= credited) return null;
    const description = t('applied', {
        raw: raw.toFixed(2),
        credited: credited.toFixed(2),
        exceeded: (raw - credited).toFixed(2),
    });
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    className="ml-1 inline-flex shrink-0 cursor-help items-center align-middle rounded-full text-[#4A7AC7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7AC7]"
                    aria-label={description}
                >
                    <Info size={14} fill="currentColor" stroke="white" aria-hidden="true" />
                </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
                <p>{description}</p>
            </TooltipContent>
        </Tooltip>
    );
};
