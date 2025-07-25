import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import CommonButton from '@/components/CommonButton/CommonButton';

import { hintLabels, searchStringParams } from '@/constants';
import { debounce, sanitizeHTML } from '@/utils';
import { getHintByQueryString } from '@/api/common';
import { SearchMode } from '@/types/intellect';

interface Props {
    keyField?: SearchMode;
    onInput?: (a: React.SyntheticEvent<HTMLInputElement>) => void;
    onSubmit?: (payload: string) => void;
    buttonText: string;
    icon?: feather.FeatherIconNames;
    placeholder?: string;
    fieldClass?: string;
    buttonClass?: string;
    value?: string;
    syntheticRef?: React.RefObject<HTMLInputElement | null>;
    tips?: boolean;
}

let handleTipsDebounced: (param: string) => void | undefined;

const InputField: React.FC<Props> = ({
    keyField,
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
}) => {
    const [userInput, setUserInput] = useState(value);
    const [showTips, setShowTips] = useState(false);
    const [tipOptions, setTipOptions] = useState<Record<string, string[]>>({});
    const [currentFocused, setCurrentFocused] = useState(-1);

    useEffect(() => {
        setUserInput(value);
        setTipOptions({});
    }, [value]);

    useEffect(() => {
        setUserInput('');
    }, [keyField]);

    useEffect(() => {
        if (handleTips) {
            handleTipsDebounced = debounce<string>(handleTips, 1000);
        }
    }, []);

    const handleTips = async (value: string | undefined) => {
        if (value) {
            try {
                const tipOptions = (await getHintByQueryString(value)) as Record<string, string[]>;
                setTipOptions(tipOptions);
            } catch (e) {
                setShowTips(false);
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
            handleTipClick(userInput);
            onSubmit && onSubmit(userInput);
        }

        if (e.key === 'ArrowDown') {
            const focusableTips = document.querySelectorAll('.focusable-tips');
            if (!focusableTips.length) return;

            if (currentFocused === -1) {
                if (focusableTips.length) {
                    setCurrentFocused(0);
                    (focusableTips[0] as HTMLElement).focus();
                }
            }

            if (currentFocused === focusableTips.length - 1) {
                setCurrentFocused(0);
                (focusableTips[0] as HTMLElement).focus();
                return;
            }

            setCurrentFocused((prevState) => {
                const el = focusableTips[prevState + 1];
                el && (el as HTMLElement).focus();
                return prevState + 1;
            });
        }

        if (e.key === 'ArrowUp') {
            const focusableTips = document.querySelectorAll('.focusable-tips');
            if (!focusableTips.length) return;

            if (currentFocused === 0) {
                setCurrentFocused(() => {
                    const el = focusableTips[focusableTips.length - 1];
                    el && (el as HTMLElement).focus();
                    return focusableTips.length - 1;
                });

                return;
            }

            setCurrentFocused((currentFocus) => {
                const el = focusableTips[currentFocus - 1];
                el && (el as HTMLElement).focus();
                return currentFocus - 1;
            });
        }
    };

    const handleTipClick = (value: string) => {
        setUserInput(value);
        setShowTips(false);
    };

    const getTipList = (): React.ReactNode[] => {
        let tipNodes: React.ReactNode[] = [];
        let localTipOptions = tipOptions;

        switch (keyField) {
            case 'overall':
                localTipOptions = { persons: localTipOptions.persons };
                break;
            case 'subdivision':
                localTipOptions = { subdivisions: localTipOptions.subdivisions };
                break;
            case 'interests':
                localTipOptions = { interests: localTipOptions.interests };
                break;
        }

        for (const key in localTipOptions) {
            if (!localTipOptions[key]?.length) continue;

            !keyField && tipNodes.push(<div className="p-2 font-bold grey">{hintLabels[key]}</div>);
            const mappedNodes = localTipOptions[key].map((tip) => (
                <div
                    tabIndex={0}
                    key={tip}
                    onClick={() => handleTipClick(tip)}
                    className="p-2 cursor-pointer hover:bg-neutral-200 focusable-tips"
                    title={tip}
                    dangerouslySetInnerHTML={{
                        __html: tip.replace(userInput, `<strong>${sanitizeHTML(userInput)}</strong>`),
                    }}
                />
            ));

            tipNodes = [...tipNodes, ...mappedNodes];
        }

        return tipNodes;
    };

    return (
        <div
            onKeyDown={handleKeyDown}
            className="relative flex items-center w-full gap-2 p-1 mt-6 rounded-lg border-1 border-neutral-100"
        >
            {icon ? <FeatherIcon icon={icon} /> : null}
            <input
                ref={syntheticRef}
                className={fieldClass}
                placeholder={placeholder}
                value={userInput}
                onChange={handleInput}
            ></input>
            <CommonButton
                onClick={() => (onSubmit ? onSubmit(userInput) : undefined)}
                onKeyDown={handleKeyDown}
                className={buttonClass}
            >
                {buttonText}
            </CommonButton>
            {tips && showTips ? (
                <div className="absolute bottom-0 left-0 right-0 overflow-auto translate-y-full bg-white border-t-0 border-neutral-100 border-1 rounded-b-8 max-h-200">
                    {getTipList()}
                </div>
            ) : null}
        </div>
    );
};

export default InputField;
