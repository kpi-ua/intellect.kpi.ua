import React from 'react';

import SectionTitle from '@/components/common/SectionTitle';

import { profileTabs } from '@/constants';
import { reformatLinks } from '@/utils';

type Props = {
    teacherInfo: Intellect.Teacher;
};

const IProfileDetails: React.FC<Props> = ({ teacherInfo }) => {
    const generateProfileRows = (): React.JSX.Element[] => {
        return Object.keys(profileTabs).map((key, idx) => (
            <div key={idx}>
                {profileTabs[key].map((row) =>
                    teacherInfo[row.field] ? (
                        <div className="flex flex-col xs:flex-row mt-4" key={row.field}>
                            <span className="text-neutral-500 block basis-1/4">{row.label}: </span>
                            <span
                                dangerouslySetInnerHTML={{ __html: reformatLinks(teacherInfo[row.field]) }}
                                className="basis-3/4"
                            />
                        </div>
                    ) : null
                )}
            </div>
        ));
    };

    const simplifyUrl = (url: string) => {
        try {
            // Use a URL object to parse the URL
            const parsedUrl = new URL(url);

            // Get the hostname and pathname, remove the 'www.' if it exists
            const hostname = parsedUrl.hostname.replace(/^www\./, '');
            const pathname = parsedUrl.pathname.endsWith('/') ? parsedUrl.pathname.slice(0, -1) : parsedUrl.pathname;

            // Concatenate the hostname and pathname
            return `${hostname}${pathname}`;
        } catch (e) {
            return url;
        }
    };

    const formatRecordValue = (record: { name: string; value: string; }) => {
        let url;
        switch (record.name) {
            case 'Orcid ID':
                url = `https://orcid.org/${record.value}`;
                break;
            case 'Research ID':
                url = `https://www.researchid.co/rid${record.value}`;
                break;
            case 'Telegram':
                url = `https://t.me/${record.value.replace('@', '')}`;
                break;
            case 'E-mail':
                return <span>
                    <a href={`mailto:${record.value}`}>{record.value}</a>&nbsp;
                    <i className="fa-solid fa-envelope"></i>
                </span>;
            case 'Google Scholar':
                url = `https://scholar.google.ru/citations?user=${record.value}`;
                break;
            case 'Scopus ID':
                url = `https://www.scopus.com/authid/detail.uri?authorId=${record.value}`;
                break;
            case 'Skype':
                return <span>{record.value}</span>;
            default:
                url = record.value;
        }

        return <span>
            <a target="_blank" rel="noopener noreferrer" href={url}>{simplifyUrl(record.value)}</a>&nbsp;
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </span>;
    };

    return (
        <div>
            <SectionTitle className="uppercase text-primary mt-6">Загальна інформація</SectionTitle>
            {generateProfileRows()}
            <SectionTitle className="uppercase text-primary mt-8">Контактні дані</SectionTitle>
            {(teacherInfo.contactRecords || []).map(
                (record, idx): React.JSX.Element => (
                    <div className="flex flex-col xs:flex-row mt-4" key={idx}>
                        <span className="text-neutral-500 block basis-1/4">{record.name}: </span>
                        <span className="basis-3/4 profile-links">
                            {formatRecordValue(record)}
                        </span>
                    </div>
                )
            )}
        </div>
    );
};

export default IProfileDetails;
