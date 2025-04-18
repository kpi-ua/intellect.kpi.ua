import React from 'react';

import SectionTitle from '@/components/common/SectionTitle';

import { academicDegrees, academicStatuses } from '@/constants';
import { Lecturer } from '@/types/intellect';

type Props = {
    teacherInfo: Lecturer;
};

const ProfileInfoRow = ({ title, children }: { title: string; children: React.ReactNode }) =>
    children ? (
        <div className="flex flex-col mt-4 xs:flex-row">
            <span className="block text-neutral-500 basis-1/4">{title}: </span>
            <span className="basis-3/4">{children}</span>
        </div>
    ) : null;

const IProfileDetails: React.FC<Props> = ({ teacherInfo }) => {
    /**
     * Simplifies a given URL by removing 'www.' prefix from the hostname and trailing '/' from the pathname.
     *
     * @param {string} url - The URL to be simplified.
     * @returns {string} - The simplified URL if the input is a valid URL, otherwise returns the original input.
     *
     * If the input URL is valid, the function parses it to extract the hostname and pathname.
     * It removes 'www.' if it's present at the start of the hostname. For the pathname,
     * it removes a trailing '/' if it exists. Then, it combines the simplified hostname
     * and pathname to form the simplified URL. In case of an invalid URL or any parsing error,
     * the original URL is returned as is.
     */
    const simplifyUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);

            // Get the hostname and pathname, remove the 'www.' if it exists
            const hostname = parsedUrl.hostname.replace(/^www\./, '');
            const pathname = parsedUrl.pathname.endsWith('/') ? parsedUrl.pathname.slice(0, -1) : parsedUrl.pathname;

            return `${hostname}${pathname}`;
        } catch (e) {
            return url;
        }
    };

    /**
     * Formats a given phone number string to a specific pattern if it meets the criteria.
     * The method first removes any non-digit characters from the input string.
     * If the cleaned number is 12 digits long and starts with '380',
     * it formats the number into '+XXX (XX) XXX XX XX' pattern.
     * If the number doesn't meet these conditions, it returns the original input.
     *
     * @param phoneNumber - The phone number string to be formatted.
     * @returns The formatted phone number if criteria are met, otherwise the original input.
     */
    const formatPhoneNumber = (phoneNumber: string) => {
        // Remove any character that is not a digit
        const cleanNumber = phoneNumber.replace(/\D/g, '');

        // Check if the number matches the expected format
        if (cleanNumber.length === 12 && cleanNumber.startsWith('380')) {
            // Format the number
            return cleanNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
        } else {
            // If not, return the original input
            return phoneNumber;
        }
    };

    /**
     * Format link depending on the link's type.
     *
     * @param {Object} record - The record object with properties 'name' and 'value'.
     * @param {string} record.name - The name of the record, indicating the type of link.
     * @param {string} record.value - The link value.
     * @returns {JSX.Element} - A JSX element representing the formatted link.
     *
     * This function handles different types of records like 'Orcid ID', 'Research ID', 'Telegram', etc.
     * It formats each type into a specific hyperlink or text format. The function utilizes
     * the `simplifyUrl` function to display a simplified version of the URL.
     */
    const formatRecordValue = (record: { name: string; value: string }) => {
        let url;
        switch (record.name) {
            case 'Orcid ID':
                url = `https://orcid.org/${record.value}`;
                break;
            case 'Research ID':
                url = `https://www.webofscience.com/wos/author/record/${record.value}`;
                break;
            case 'Telegram':
                url = `https://t.me/${record.value.replace('@', '')}`;
                break;
            case 'E-mail':
            case 'E-mail 2':
                return (
                    <span>
                        <a href={`mailto:${record.value}`}>{record.value}</a>&nbsp;
                        <i className="fa-solid fa-envelope"></i>
                    </span>
                );
            case 'Google Scholar':
                url = `https://scholar.google.ru/citations?user=${record.value}`;
                break;
            case 'Scopus ID':
                url = `https://www.scopus.com/authid/detail.uri?authorId=${record.value}`;
                break;
            case 'Веб-сайт':
                url = record.value;
                break;
            case 'Телефон робочий':
            case 'Телефон робочий 2':
            case 'Телефон мобільний':
            case 'Телефон мобільний 2':
                return (
                    <span>
                        <a target="_blank" rel="noopener noreferrer" href={`tel:${record.value}`}>
                            {formatPhoneNumber(record.value)}
                        </a>
                        &nbsp;
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                );
            case 'Skype':
                return <span>{record.value}</span>;
            case 'Адреса за місцем прийому':
                return <span>{record.value}</span>;
            default:
                url = record.value;
        }

        return (
            <span>
                <a target="_blank" rel="noopener noreferrer" href={url}>
                    {simplifyUrl(record.value)}
                </a>
                &nbsp;
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
        );
    };

    return (
        <div>
            <SectionTitle className="mt-6 uppercase text-primary">Загальна інформація</SectionTitle>
            <div>
                <ProfileInfoRow title="Наукові інтереси">{teacherInfo.scientificInterest}</ProfileInfoRow>
                <ProfileInfoRow title="Вчене звання">{academicStatuses[teacherInfo.academicStatus]}</ProfileInfoRow>
                <ProfileInfoRow title="Науковий ступінь">{academicDegrees[teacherInfo.academicDegree]}</ProfileInfoRow>
            </div>
            <SectionTitle className="mt-8 uppercase text-primary">Контактні дані</SectionTitle>
            {(teacherInfo.contactRecords || []).map(
                (record, idx): React.JSX.Element => (
                    <div className="flex flex-col mt-4 xs:flex-row" key={idx}>
                        <span className="block text-neutral-500 basis-1/4">{record.name}: </span>
                        <span className="basis-3/4 profile-links">{formatRecordValue(record)}</span>
                    </div>
                )
            )}
        </div>
    );
};

export default IProfileDetails;
