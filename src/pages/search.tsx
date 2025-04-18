import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import RoutePointer from '@/components/RoutePointer/RoutePointer';
import Alphabet from '@/components/Alphabet/Alphabet';
import InputField from '@/components/InputField/InputField';
import SearchGrid from '@/components/common/SearchGrid';
import ITeacherCard from '@/components/I-TeacherCard/I-TeacherCard';
import NotFoundIndicator from '@/components/ContentStubs/NotFoundIndicator';
import SpinnerIndicator from '@/components/ContentStubs/SpinnerIndicator';
import Pagination from '@/components/Pagination/Pagination';

import { searchByInput } from '@/api/teacher';
import { searchStringParams } from '@/constants';
import useLinkRoute from '@/utils/hooks/useLinkRoute';
import useRuntimeCache from '@/utils/hooks/useRuntimeCache';
import { Lecturer } from '@/types/intellect';
import { PaginationModel } from '@/types/ecampus';

const CACHE_KEY = 'cachedSearch_';

const Search: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();

    const searchStateInput = search.get('state_input');

    const inputRef = useRef<HTMLInputElement>(null);
    const searchedValue = useRef('');

    const [teachers, setTeachers] = useState<Lecturer[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const { route } = useLinkRoute([{ path: '/search', label: 'Пошук' }]);

    const [pagingOptions, setPagingOptions] = useState<PaginationModel | null>(null);

    const { invalidateCache, cacheSlice, setCache } = useRuntimeCache<Record<number, Lecturer[]>>(CACHE_KEY);

    const [loading, setLoading] = useState(false);

    /**
     * @description Initial loading of data, reflecting the current search state in URL.
     * Will determine type of search from query params set searched value to the input field.
     */
    useEffect(() => {
        const searchString = searchStateInput?.trim() || '';

        setSearchValue(searchString);
        setInputValue(searchString);

        if (inputRef.current) {
            inputRef.current.select();
        }
    }, [searchStateInput, router.isReady]);

    /**
     * @description Search for teachers on every change of search value.
     * Search value expected to be updated on search form submission.
     */
    useEffect(() => {
        invalidateCache();
        fetchTeachers(1);
        return invalidateCache;
    }, [searchValue]);

    const fetchTeachers = async (page: number) => {
        try {
            setLoading(true);
            const data = await searchByInput(searchValue, page);
            setTeachers(data.data);
            setCache({ [page]: data.data });
            searchedValue.current = searchValue;
            setPagingOptions(data.paging);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /**
     * @description Handle search form submit.
     * Will update URL and update searched value, which expected to trigger search hook.
     * @param value new value for input. Expected to have mode appended if needed. (e.g. alphabetic:<searchValue>)
     * @param doSearch should we make search?
     * @param focus should input element be focused after submit?
     */
    const onSubmit = async (value: string, doSearch = false, focus = true) => {
        if (doSearch) {
            setSearchValue(value);
        }
        setInputValue(value);

        if (focus && inputRef.current) {
            inputRef.current.select();
        }

        if (doSearch) {
            setPagingOptions(null);

            router.push({
                pathname,
                query: { ...router.query, state_input: value },
            });
        }
    };

    const ShownContent = (): React.ReactNode => {
        if (loading) {
            return <SpinnerIndicator className="mx-auto w-fit" />;
        }

        if (teachers.length) {
            return (
                <SearchGrid className="mt-6">
                    {teachers.map((item, idx) => (
                        <ITeacherCard className="justify-self-center" key={idx} teacherInfo={item} />
                    ))}
                </SearchGrid>
            );
        }

        if (!teachers.length) {
            return <NotFoundIndicator className="mx-auto w-fit" />;
        }
    };

    const handlePageChange = (newPage: number) => {
        if (cacheSlice && cacheSlice[newPage]) {
            setTeachers(cacheSlice[newPage]);
        } else {
            if (searchValue) {
                fetchTeachers(newPage);
            }
        }
    };

    return (
        <section className="pt-12 pb-20 wrapper">
            <RoutePointer routePath={route} />
            <div className="mt-4">
                <Alphabet onLetterSelected={(e) => onSubmit(searchStringParams.STARTS_WITH + e, true, false)} />
                <InputField
                    syntheticRef={inputRef}
                    tips={true}
                    onSubmit={(e) => onSubmit(e, true, false)}
                    placeholder="Введіть рядок пошуку"
                    value={inputValue}
                    fieldClass="px-2 py-4 text-black flex-1 max-h-6 overflow-auto"
                    buttonText="Пошук"
                    buttonClass="px-4 py-1 h-40 flex items-center"
                />
            </div>
            <ShownContent />
            {teachers.length > 0 && pagingOptions && (
                <Pagination onChange={(newPage) => handlePageChange(newPage)} pagination={pagingOptions} />
            )}
        </section>
    );
};

export default Search;
