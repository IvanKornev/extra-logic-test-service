export const generateString = (length = 8) => {
  let result;
  for (let i = 0; i < length; i += 1) {
    const range = 97 + Math.floor(Math.random() * 26);
    result += String.fromCharCode(range);
  }
  return result;
};
