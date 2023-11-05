export const decodeHtmlCharCodes = (str: string): string => {
  return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
}
