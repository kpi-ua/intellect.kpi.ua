import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Rating } from '@/types/intellect';
import { useTranslations } from 'next-intl';

interface RatingsProps {
    ratings: Rating[];
}

export const Ratings = ({ ratings }: RatingsProps) => {
    const t = useTranslations('profile.ratings');

    if (ratings.length === 0) {
        return (
            <div className="flex justify-between">
                <SectionTitle className="mt-3 text-primary">{t('no_data')}</SectionTitle>
            </div>
        );
    }
    return (
        <div className="relative justify-between gap-24 mt-4">
            <p className="text-xs text-neutral-600">
                {t('description')}
            </p>

            <div className="w-full overflow-x-scroll">
                <table className="-ml-6 -mr-6 border-separate whitespace-nowrap border-spacing-x-6 border-spacing-y-2">
                    <thead className="text-sm text-left text-primary">
                        <tr className="border-2 border-solid border-neutral-950">
                            <th>{t('table.year')}</th>
                            <th>{t('table.emr')}</th>
                            <th>{t('table.sir')}</th>
                            <th>{t('table.oer')}</th>
                            <th>{t('table.overall')}</th>
                            <th>{t('table.subdivision')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-neutral-600">
                        {ratings.map((rating) => (
                            <tr key={rating.studyYear}>
                                <td>{rating.studyYear}</td>
                                <td>{rating.educationalMethodologicalRating}</td>
                                <td>{rating.scientificInnovativeRating}</td>
                                <td>{rating.organizationalEducationalRating}</td>
                                <td>{rating.overallRating}</td>
                                <td>{rating.subdivision.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-6">
                <strong>{t('table.emr')}</strong> – {t('legend.emr')} <br />
                <strong>{t('table.sir')}</strong> - {t('legend.sir')} <br />
                <strong>{t('table.oer')}</strong> - {t('legend.oer')} <br />
            </p>
        </div>
    );
};
