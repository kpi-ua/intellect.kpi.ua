'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';

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
import useClickOutside from '@/utils/hooks/useClickOutside';

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
    const t = useTranslations('search');
    const [userInput, setUserInput] = useState(value);
    const [tipOptions, setTipOptions] = useState<Lecturer[]>([]);
    const [isTipsVisible, setIsTipsVisible] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUserInput(value);
        setTipOptions([]);
        setIsTipsVisible(false);
    }, [value]);

    useClickOutside(containerRef, () => setIsTipsVisible(false), isTipsVisible);

    const handleTips = async (value: string | undefined) => {
        if (value) {
            try {
                const response = (await searchByInput(value, 1));
                setTipOptions(response.data);
                setIsTipsVisible(true);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleTipsDebounced = useMemo(() => debounce<string>(handleTips, 1000), []);

    const handleInput = (val: string) => {
        setUserInput(val);

        if (val.length < 3) {
            setIsTipsVisible(false);
        }

        if (val.length >= 3 && Object.values(searchStringParams).every((param) => !val.startsWith(param))) {
            handleTipsDebounced(val);
        }
    };

    const handleTipSelect = (val: string) => {
        setIsTipsVisible(false);
        onTipClick?.(val);
    };

    const handleSubmit = () => {
        setIsTipsVisible(false);
        onSubmit?.(userInput);
    }


    return (
        <Command className="flex-1 overflow-visible bg-transparent h-fit" shouldFilter={false}>
            <div ref={containerRef} className={`relative flex items-center w-full gap-2`}>
                <CommandInput
                    placeholder={placeholder}
                    value={userInput}
                    onValueChange={handleInput}
                    className="px-2 w-full text-black flex-1 border-none outline-none shadow-none focus-visible:ring-0 h-[50px]"
                    onFocus={() => {
                        if (tipOptions.length > 0) setIsTipsVisible(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsTipsVisible(false);
                            onSubmit?.(userInput);
                        }
                    }}
                />
                <Button onClick={handleSubmit} className="px-4 py-1 h-[40px] flex items-center text-sm font-medium">
                    {t('button')}
                </Button>

                {isTipsVisible && tipOptions && tipOptions.length > 0 && (
                    <CommandList className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-lg shadow-xl z-50 overflow-hidden max-h-80 w-card min-w-full lg:min-w-fit">
                        <CommandEmpty>{t('tips.empty')}</CommandEmpty>
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
