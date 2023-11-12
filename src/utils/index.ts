import { searchStringParams } from "../constants";

export const decodeHtmlCharCodes = (str: string): string => {
  return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
}

export const parseSearchParams = (searchString: string): {[key in Intellect.SearchParams]: string} => {
  const paramsObject: {[key in Intellect.SearchParams]: string} = {
    startsWith: '',
    subdivision: '',
    interests: ''
  };

  Object.values(searchStringParams).forEach(param => {
    if (searchString.startsWith(param)) {
      // remove ':' from the end
      paramsObject[param.slice(0, -1) as Intellect.SearchParams] = searchString.replace(param, '');
    }
  })

  return paramsObject;
}
