import { searchStringParams } from '@/constants';
import { SearchParams } from '@/types/intellect';

export const decodeHtmlCharCodes = (str: string): string => {
  return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
};

export const parseSearchParams = (searchString: string): Record<SearchParams, string> => {
  const paramsObject: { [key in SearchParams]: string } = {
    startsWith: '',
    subdivision: '',
    interests: '',
  };

  Object.values(searchStringParams).forEach((param) => {
    if (searchString.startsWith(param)) {
      // remove ':' from the end
      paramsObject[param.slice(0, -1) as SearchParams] = searchString.replace(param, '');
    } else if (searchString.includes(param)) {
      const params = new URLSearchParams(searchString);
      const paramValue = params.get(param);

      paramsObject[param as SearchParams] = paramValue ? paramValue : '';
    }
  });

  return paramsObject;
};

export const debounce = <T>(cb: (param?: T) => void, debounceTimeout: number) => {
  let timer: NodeJS.Timeout | null = null;

  return (param?: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      cb(param);
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
