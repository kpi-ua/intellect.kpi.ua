import { searchStringParams } from '../constants';

export const decodeHtmlCharCodes = (str: string): string => {
    return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
};

export const parseSearchParams = (searchString: string): { [key in Intellect.SearchParams]: string } => {
    const paramsObject: { [key in Intellect.SearchParams]: string } = {
        startsWith: '',
        subdivision: '',
        interests: '',
        pageNumber: '',
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
