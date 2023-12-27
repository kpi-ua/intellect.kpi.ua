import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import CommonButton from '@/components/CommonButton/CommonButton';

import { searchStringParams } from '@/constants';
import { debounce } from '@/utils';

interface Props {
    onInput?: (a: React.SyntheticEvent<HTMLInputElement>) => void;
    onSubmit?: (payload: string) => void;
    buttonText: string;
    icon?: feather.FeatherIconNames;
    placeholder?: string;
    fieldClass?: string;
    buttonClass?: string;
    value?: string;
    syntheticRef?: React.RefObject<HTMLInputElement>;
    tips?: boolean;
    tipsFetchFunction?: (q: string) => Promise<string[]>;
}

let handleTipsDebounced: (param: string) => void | undefined;

const InputField: React.FC<Props> = ({
    onInput,
    onSubmit,
    buttonText,
    icon = '' as feather.FeatherIconNames,
    placeholder = '',
    fieldClass = '',
    buttonClass = '',
    value = '',
    syntheticRef = null,
    tips,
    tipsFetchFunction,
}) => {
    const [userInput, setUserInput] = useState(value);
    const [showTips, setShowTips] = useState(false);
    const [tipOptions, setTipOptions] = useState<string[]>([]);

    useEffect(() => {
        setUserInput(value);
    }, [value]);

    useEffect(() => {
        if (handleTips) {
            handleTipsDebounced = debounce<string>(handleTips, 1000);
        }
    }, []);

    const handleTips = async (value: string | undefined) => {
        setShowTips(false);

        if (tipsFetchFunction && value) {
            try {
                const tipOptions = (await tipsFetchFunction(value)) as [];
                setTipOptions(tipOptions);
            } catch (e) {
                console.error(e);
            }
        }

        setShowTips(true);
    };

    const handleInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onInput && onInput(e);
        const value = e.currentTarget.value;
        setUserInput(value);

        if (value.length >= 3 && Object.values(searchStringParams).every((param) => !value.startsWith(param))) {
            handleTipsDebounced && handleTipsDebounced(value);
        } else {
            setShowTips(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onSubmit && onSubmit(userInput);
        }
    };

    const handleTipClick = (value: string) => {
        setUserInput(value);
        setShowTips(false);
    };

    const getTipList = (): React.ReactNode[] => {
        return tipOptions.map((tip) => (
            <div key={tip} onClick={() => handleTipClick(tip)} className="cursor-pointer hover:bg-neutral-200 p-2">
                {tip}
            </div>
        ));
    };

    return (
        <div className="flex items-center w-full rounded-lg border-1 border-neutral-100 p-1 mt-6 relative">
            {icon ? <FeatherIcon icon={icon} /> : null}
            <input
                ref={syntheticRef}
                className={fieldClass}
                placeholder={placeholder}
                value={userInput}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
            ></input>
            <CommonButton
                onClick={() => (onSubmit ? onSubmit(userInput) : undefined)}
                onKeyDown={handleKeyDown}
                className={buttonClass}
            >
                {buttonText}
            </CommonButton>
            {tips && showTips && tipOptions.length ? (
                <div className="absolute bottom-0 left-0 right-0 border-neutral-100 translate-y-full bg-white border-1 border-t-0 rounded-b-8 max-h-200 overflow-auto">
                    {getTipList()}
                </div>
            ) : null}
        </div>
    );
};

export default InputField;
