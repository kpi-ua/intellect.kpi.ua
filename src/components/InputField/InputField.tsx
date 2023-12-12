import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import CommonButton from '@/components/CommonButton/CommonButton';

type Props = {
    onInput?: (a: React.SyntheticEvent<HTMLInputElement>) => void;
    onSubmit?: (payload: string) => void;
    buttonText: string;
    icon?: feather.FeatherIconNames;
    placeholder?: string;
    fieldClass?: string;
    buttonClass?: string;
    value?: string;
    syntheticRef?: React.RefObject<HTMLInputElement>;
};

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
}) => {
    const [userInput, setUserInput] = useState(value);

    useEffect(() => {
        setUserInput(value);
    }, [value]);

    const handleInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
        onInput && onInput(e);
        setUserInput(e.currentTarget.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onSubmit && onSubmit(userInput);
        }
    };

    return (
        <>
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
        </>
    );
};

export default InputField;
