import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Rating } from '@/types/intellect';

interface RatingsProps {
    ratings: Rating[];
}

export const Ratings = ({ ratings }: RatingsProps) => {
    if (ratings.length === 0) {
        return <SectionTitle className="mt-3 text-primary">Дані відсутні</SectionTitle>;
    }

    return (
        <div className="relative justify-between gap-24 mt-4">
            <p className="text-xs text-neutral-600">
                Оцінювання професійної діяльності науково-педагогічних працівників є складовою внутрішньої системи
                забезпечення якості вищої освіти та освітньої діяльності університету.
            </p>

            <div className="w-full overflow-x-scroll">
                <table className="-ml-6 -mr-6 border-separate whitespace-nowrap border-spacing-x-6 border-spacing-y-2">
                    <thead className="text-sm text-left text-primary">
                        <tr className="border-2 border-solid border-neutral-950">
                            <th>Навчальний рік</th>
                            <th>НМР</th>
                            <th>НIР</th>
                            <th>ОВР</th>
                            <th>Загальний рейтинг</th>
                            <th>Кафедра</th>
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
                <strong>НМР</strong> – рейтинг з навчально-методичної роботи <br />
                <strong>НIР</strong> - рейтинг з науково-інноваційної роботи <br />
                <strong>ОВР</strong> - рейтинг з організаційно-виховної роботи <br />
            </p>
        </div>
    );
};
