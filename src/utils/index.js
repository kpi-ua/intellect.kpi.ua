export const decodeHtmlCharCodes = str => {
  return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
}
