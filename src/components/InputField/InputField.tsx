'use client';
import React, { useEffect, useState, useMemo } from 'react';

import CommonButton from '@/components/CommonButton/CommonButton';

import { searchStringParams } from '@/constants';
import { debounce } from '@/utils';
import { Lecturer } from '@/types/intellect';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command';
import { searchByInput } from '@/api/teacher';

interface Props {
    onSubmit?: (payload: string) => void;
    onTipClick?: (payload: string) => void;
    placeholder?: string;
    value?: string;
}

const InputField: React.FC<Props> = ({
    onSubmit,
                                         onTipClick,
    placeholder = '',
    value = '',
}) => {
    const [userInput, setUserInput] = useState(value);
    const [tipOptions, setTipOptions] = useState<Lecturer[]>();

    useEffect(() => {
        setUserInput(value);
        setTipOptions([]);
    }, [value]);

    const handleTips = async (value: string | undefined) => {
        if (value) {
            try {
                const response = (await searchByInput(value, 1));
                setTipOptions(response.data);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleTipsDebounced = useMemo(() => debounce<string>(handleTips, 1000), []);

    const handleInput = (val: string) => {
        setUserInput(val);

        if (val.length >= 3 && Object.values(searchStringParams).every((param) => !val.startsWith(param))) {
            handleTipsDebounced(val);
        }
    };

    const handleTipSelect = (val: string) => {
        onTipClick?.(val);
    };


    return (
        <Command className="flex-1 overflow-visible bg-transparent h-fit" shouldFilter={false}>
            <div className={`relative flex items-center w-full gap-2`}>
                <CommandInput
                    placeholder={placeholder}
                    value={userInput}
                    onValueChange={handleInput}
                    className="px-2 w-full text-black flex-1 border-none outline-none shadow-none focus-visible:ring-0 h-[50px]"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit?.(userInput);
                        }
                    }}
                />
                <CommonButton onClick={() => onSubmit?.(userInput)} className="px-4 py-1 h-40 flex items-center">
                    Пошук
                </CommonButton>

                {tipOptions?.length && (
                    <CommandList className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-lg shadow-xl z-50 overflow-hidden max-h-80 w-card min-w-full lg:min-w-fit">
                        <CommandEmpty>Нічого не знайдено</CommandEmpty>
                        <CommandGroup>
                            {tipOptions.map((lecturer) => (
                                <CommandItem
                                    key={lecturer.id}
                                    onSelect={() => handleTipSelect(lecturer.userIdentifier)}
                                    className="px-4 py-2 cursor-pointer hover:bg-neutral-50 aria-selected:bg-neutral-50"
                                >
                                    {lecturer.fullName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                )}
            </div>
        </Command>
    );
};

export default InputField;
