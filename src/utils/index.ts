import { searchStringParams } from '@/constants';

export const decodeHtmlCharCodes = (str: string): string => {
    return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
};

export const parseSearchParams = (searchString: string): { [key in Intellect.SearchParams]: string } => {
    const paramsObject: { [key in Intellect.SearchParams]: string } = {
        startsWith: '',
        subdivision: '',
        interests: '',
    };

    Object.values(searchStringParams).forEach((param) => {
        if (searchString.startsWith(param)) {
            // remove ':' from the end
            paramsObject[param.slice(0, -1) as Intellect.SearchParams] = searchString.replace(param, '');
        } else if (searchString.includes(param)) {
            const params = new URLSearchParams(searchString);
            const paramValue = params.get(param);

            paramsObject[param as Intellect.SearchParams] = paramValue ? paramValue : '';
        }
    });

    return paramsObject;
};

export const debounce = (cb: () => void, debounceTimeout: number) => {
    let timer: NodeJS.Timeout | null = null;

    return () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            cb();
            timer = null;
        }, debounceTimeout);
    };
};

export const sanitizeHTML = (text: string): TrustedHTML & string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;');
};

const URLRegEx = /\b(?:https?:\/\/\S+)(?=\s|$)/gim;
const emailRegEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim;
export const reformatLinks = (text: string) => {
    let sanitizedText = sanitizeHTML(text);

    const urlInputs = sanitizedText.match(URLRegEx) || [];
    const emailInputs = sanitizedText.match(emailRegEx) || [];

    urlInputs.forEach((url) => {
        sanitizedText = sanitizedText.replace(url, `<a class="underline" href=${url}>${url}</a>`);
    });
    emailInputs.forEach((email) => {
        sanitizedText = sanitizedText.replace(email, `<a class="underline" href=mailto:${email}>${email}</a>`);
    });

    return sanitizedText;
};
