'use client';

import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const t = useTranslations('global');

    return (
        <div className="flex flex-col items-center py-24">
            <div className="flex flex-col items-center text-center text-neutral-500" role="alert">
                <CircleAlert aria-hidden="true" className="size-10 text-primary" />
                <p className="mt-4">{t('service_unavailable')}</p>
            </div>
            <Button className="mt-6" onClick={reset}>
                {t('try_again')}
            </Button>
        </div>
    );
}
