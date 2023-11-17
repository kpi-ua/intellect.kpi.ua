import React from 'react';
import { decodeHtmlCharCodes } from '../../utils';

const htmlCodeStart = '&#';
const indexes = [
    [1040, 1043],
    [1168],
    [1044, 1045],
    [1028],
    [1046, 1048],
    [1030, 1031],
    [1049, 1065],
    [1068],
    [1070, 1071],
];

type Props = {
    onLetterSelected?: (a: string) => void;
};

const Alphabet: React.FC<Props> = ({ onLetterSelected = () => {} }) => {
    const LetterElement = (letterFullCode: string): React.JSX.Element => (
        <span
            key={letterFullCode}
            className="hover:text-blue-950 transition-all"
            onClick={() =>
                onLetterSelected(decodeHtmlCharCodes(letterFullCode))
            }
            dangerouslySetInnerHTML={{ __html: letterFullCode as any }}
        />
    );

    const alphabetRow = indexes.reduce(
        (acc: React.JSX.Element[], el: number[]): React.JSX.Element[] => {
            if (el.length === 2) {
                let raw = [];

                for (let i = el[0]; i <= el[1]; i++) {
                    const letterFullCode = `${htmlCodeStart + i};`;
                    raw.push(LetterElement(letterFullCode));
                }

                return [...acc, ...raw];
            }

            const letterFullCode = `${htmlCodeStart + el[0]};`;
            return [...acc, LetterElement(letterFullCode)];
        },
        []
    );

    return (
        <div className="xs:tracking-[0.7em] tracking-[2em] font-semibold text-gray cursor-pointer overflow-x-auto scrollbar-hidden">
            {alphabetRow}
        </div>
    );
};

export default Alphabet;
