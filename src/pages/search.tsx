import React, { useEffect, useRef, useState } from 'react';

import RoutePointer from '@/components/RoutePointer/RoutePointer';
import Alphabet from '@/components/Alphabet/Alphabet';
import InputField from '@/components/InputField/InputField';
import SearchGrid from '@/components/common/SearchGrid';
import ITeacherCard from '@/components/I-TeacherCard/I-TeacherCard';

import { searchByInput } from '../api/teacher';
import CommonButton from '../components/CommonButton/CommonButton';
import { searchStringParams } from '../constants';
import useLinkRoute from '../utils/hooks/useLinkRoute';
import { usePathname, useSearchParams } from 'next/navigation';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import { useRouter } from 'next/router';

const Search: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();

    const searchStateInput = search.get('state_input');
    const searchStateMode = search.get('mode');

    const inputRef = useRef<HTMLInputElement>(null);
    const searchedValue = useRef('');

    const [teachers, setTeachers] = useState<Intellect.Teacher[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const { route } = useLinkRoute([{ path: '/search', label: 'Пошук' }]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    /**
     * @description Initial loading of data, reflecting the current search state in URL.
     * Will determine type of search from query params set searched value to the input field.
     */
    useEffect(() => {
        const searchString = createSearchString(searchStateMode || '', searchStateInput || '');

        setSearchValue(searchString);

        if (inputRef.current) {
            inputRef.current.select();
        }
    }, [searchStateInput, searchStateMode, router.isReady]);

    /**
     * @description Search for teachers on every change of search value.
     * Search value expected to be updated on search form submission.
     */
    useEffect(() => {
        (async () => {
            if (searchValue.trim() && searchedValue.current !== searchValue) {
                try {
                    const data = await searchByInput(searchValue);
                    setTeachers(data.data);
                    searchedValue.current = searchValue;

                    setCurrentPage(data.paging.pageNumber);
                    setTotalPages(data.paging.pageCount);
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [searchValue]);

    const createSearchString = (mode: string, input: string): string => {
        switch (mode) {
            case 'alphabetic':
                return 'startsWith:' + input;
            case 'subdivision':
                return 'subdivision:' + input;
            case 'interests':
                return 'interests:' + input;
            default:
                return input;
        }
    };

    /**
     * @description Handle search form submit.
     * Will update URL and update searched value, which expected to trigger search hook.
     * @param value new value for input. Expected to have mode appended if needed. (e.g. alphabetic:<searchValue>)
     */
    const onSubmit = (value: string, doSearch = true, focus = true) => {
        setSearchValue(value);

        if (focus && inputRef.current) {
            inputRef.current.select();
        }

        router.push({
            pathname,
            query: { ...router.query, state_input: value },
        });
    };

    /**
     * @description Handle buttons for 'Prev' and 'Next' pages. Will increase/decrease page number.
     * @param newPage
     */
    const onPageChange = (newPage: number) => {
        if (searchValue.includes('pageNumber')) {
            const searchValueAltered = searchValue.replace(/pageNumber=\d+/, `pageNumber=${newPage}`);
            setSearchValue(searchValueAltered);
        } else {
            const searchValueAltered = searchValue + `&pageNumber=${newPage}`;
            setSearchValue(searchValueAltered);
        }
    };

    return (
        <section className="wrapper pt-12 pb-160">
            <RoutePointer routePath={route} />
            <div className="mt-4">
                <Alphabet onLetterSelected={(e) => onSubmit(searchStringParams.STARTS_WITH + e, true, false)} />
                <div className="flex w-full rounded-lg border-1 border-neutral-100 p-1 mt-6">
                    <InputField
                        syntheticRef={inputRef}
                        onSubmit={(e) => onSubmit(e, true, false)}
                        placeholder="Введіть строку пошука"
                        value={searchValue}
                        fieldClass="flex-1"
                        buttonText="Пошук"
                        buttonClass="px-4 py-1 h-40 flex items-center"
                    />
                </div>
            </div>
            <div className="mt-2">
                <span className="text-primary">Або оберіть режим пошуку:</span>
                <div className="flex gap-2">
                    <CommonButton onClick={() => onSubmit(searchStringParams.SUBDIVISION, false)} className="p-2">
                        За місцем роботи
                    </CommonButton>
                    <CommonButton onClick={() => onSubmit(searchStringParams.INTERESTS, false)} className="p-2">
                        За інтересами{' '}
                    </CommonButton>
                </div>
            </div>
            <SearchGrid className="mt-6">
                {teachers.map((item, idx) => (
                    <ITeacherCard className="justify-self-center" key={idx} teacherInfo={item} />
                ))}
            </SearchGrid>
            {teachers.length > 0 && (
                <div className={'flex items-center justify-center mt-6'}>
                    {currentPage > 1 ? (
                        <button onClick={() => onPageChange(currentPage - 1)}>
                            <FeatherIcon width={40} className="inline fill-none" icon="chevron-left" />
                            Далі
                        </button>
                    ) : (
                        <span className="text-neutral-600">
                            <FeatherIcon width={40} className="inline fill-none " icon="chevron-left" />
                            Далі
                        </span>
                    )}
                    <div className="mx-2">
                        Сторінка {currentPage} з {totalPages}
                    </div>
                    {currentPage < totalPages ? (
                        <button onClick={() => onPageChange(currentPage + 1)}>
                            Далі
                            <FeatherIcon width={40} className="inline fill-none" icon="chevron-right" />
                        </button>
                    ) : (
                        <span className="text-neutral-600">
                            Далі
                            <FeatherIcon width={40} className="inline fill-none" icon="chevron-right" />
                        </span>
                    )}
                </div>
            )}
        </section>
    );
};

export default Search;
