import React from 'react';

interface RatingsProps {
  ratings: Intellect.Rating[];
}

export const Ratings = ({ ratings }: RatingsProps) => {
    return (
        <div className="w-full overflow-x-scroll">
            <table className="-ml-6 -mr-6 border-separate whitespace-nowrap border-spacing-x-6 border-spacing-y-2">
                <thead className="text-sm text-left text-primary">
                    <tr className="border-2 border-solid border-neutral-950">
                        <th>Навчальний рік</th>
                        <th>Рейтинг з навчально-методичної роботи</th>
                        <th>Рейтинг з науково-інноваційної роботи</th>
                        <th>Рейтинг з організаційно-виховної роботи</th>
                        <th>Загальний рейтинг</th>
                        <th>Кафедра</th>
                    </tr>
                </thead>
                <tbody className="text-xs text-neutral-600">
                    {ratings.map(rating => (
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
    );
};
