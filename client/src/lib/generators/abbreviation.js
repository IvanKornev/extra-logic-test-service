export const generateAbbreviation = (phrase) =>
  phrase
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
