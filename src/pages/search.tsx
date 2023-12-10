import React, { useEffect, useRef, useState } from 'react';

import RoutePointer from '@/components/RoutePointer/RoutePointer';
import Alphabet from '@/components/Alphabet/Alphabet';
import InputField from '@/components/InputField/InputField';
import SearchGrid from '@/components/common/SearchGrid';
import ITeacherCard from '@/components/I-TeacherCard/I-TeacherCard';

import { searchByInput } from '@/api/teacher';
import CommonButton from '@/components/CommonButton/CommonButton';
import { searchStringParams } from '@/constants';
import useLinkRoute from '@/utils/hooks/useLinkRoute';
import { useSearchParams } from 'next/navigation';

const Search: React.FC = () => {
    const search = useSearchParams();

    const searchStateInput = search.get('state_input');
    const searchStateMode = search.get('mode');

    const inputRef = useRef<HTMLInputElement>(null);
    const searchedValue = useRef('');

    const [teachers, setTeachers] = useState<Intellect.Teacher[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const { route } = useLinkRoute([{ path: '/search', label: 'Пошук' }]);

    const searchTeacher = async (value: string) => {
        if (value.trim() && searchedValue.current !== value) {
            try {
                const data = await searchByInput(value);
                setTeachers(data.data);
                searchedValue.current = value;
            } catch (e) {
                console.error(e);
            }
        }
    };

    useEffect(() => {
        const searchString = createSearchString(searchStateMode || '', searchStateInput || '');
        onSubmit(searchString);
    }, [searchStateInput, searchStateMode]);

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

    const onSubmit = (value: string, doSearch = true, focus = true) => {
        setSearchValue(value);

        if (doSearch) {
            searchTeacher(value);
        }

        if (focus && inputRef.current) {
            inputRef.current.select();
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
        </section>
    );
};

export default Search;
