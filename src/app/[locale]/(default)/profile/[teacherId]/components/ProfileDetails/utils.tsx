import React from 'react';

import { ContactType } from '@/types/enums';
import { ContactRecord } from '@/types/intellect';

export const ContactValue: React.FC<{ record: ContactRecord }> = ({ record }) => {
    switch (record.type) {
        case ContactType.Email:
            return (
                <span>
                    <a href={`mailto:${record.value}`}>{record.value}</a>&nbsp;
                    <i className="fa-solid fa-envelope"></i>
                </span>
            );
        case ContactType.WorkPhone:
            return (
                <span>
                    <a target="_blank" rel="noopener noreferrer" href={`tel:${record.value}`}>
                        {record.value}
                    </a>
                    &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
            );
        default:
            return (
                <span>
                    <a target="_blank" rel="noopener noreferrer" href={record.value}>
                        {record.label || record.value}
                    </a>
                    &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
            );
    }
};
