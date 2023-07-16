export const ucwords = (text: string) => {
  return text.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
};
export const toCamelCase = (text: string) => {
  return text.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};
