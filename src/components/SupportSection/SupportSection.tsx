import React from 'react';
import { useTranslations } from 'next-intl';

const SupportSection: React.FC = () => {
    const t = useTranslations('contacts.support');

    return (
        <div className="flex flex-col gap-8 mt-6">
            <h2 className="text-2xl font-bold text-primary">{t('title')}</h2>
            <p className="text-neutral-700 leading-relaxed">{t('intro')}</p>

            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-lg font-bold mb-2">{t('bibliometrics.title')}</h3>
                    <p className="text-neutral-600 mb-2">{t('bibliometrics.description')}</p>
                    <ul className="list-none space-y-1">
                        <li>
                            <span className="font-semibold">{t('bibliometrics.email_label')}: </span>
                            <a
                                href={`mailto:science@library.kpi.ua?subject=${t('bibliometrics.email_subject')}`}
                                className="text-primary hover:underline"
                            >
                                science@library.kpi.ua
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold">{t('bibliometrics.phone_label')}: </span>
                            <a href="tel:+380442049672" className="text-primary hover:underline">
                                +380 (44) 204-96-72
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-2">{t('load.title')}</h3>
                    <p className="text-neutral-600 mb-2">{t('load.description')}</p>
                    <ul className="list-none space-y-1">
                        <li>
                            <span className="font-semibold">{t('load.email_label')}: </span>
                            <a
                                href={`mailto:kbis@edu.kpi.ua?subject=${t('load.email_subject')}`}
                                className="text-primary hover:underline"
                            >
                                kbis@edu.kpi.ua
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-brand-100/50 p-6 rounded-2xl border border-brand-200">
                <h3 className="text-lg font-bold mb-4">{t('important.title')}</h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-700">
                    <li>{t('important.item_1')}</li>
                    <li>{t('important.item_2')}</li>
                    <li>{t('important.item_3')}</li>
                </ul>
            </div>
        </div>
    );
};

export default SupportSection;
