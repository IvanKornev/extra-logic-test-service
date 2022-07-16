export const generateAbbreviation = (phrase) => {
  const words = phrase.split(' ');
  const letters = words.map((word) => (
    word.charAt(0).toUpperCase()
  ))

  const abbreviation = letters.join('');
  if (letters.length > 2) {
    const shortedAbbreviation = abbreviation.slice(0, 1);
    return shortedAbbreviation;
  }
  return abbreviation;
}
