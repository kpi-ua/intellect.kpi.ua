import FeatherIcon from '../FeatherIcon/FeatherIcon';
import CommonButton from '../CommonButton/CommonButton';
import feather from 'feather-icons';
import React, { useEffect, useState } from 'react';

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
    onInput = () => {  console.log('Input received'); },
    onSubmit = () => {  console.log('Submit received'); },
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
        onInput(e);
        setUserInput(e.currentTarget.value);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>
    ) => {
        if (e.key === 'Enter') {
            onSubmit(userInput);
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
                onClick={() => onSubmit(userInput)}
                onKeyDown={handleKeyDown}
                className={buttonClass}
            >
                {buttonText}
            </CommonButton>
        </>
    );
};

export default InputField;
