export const generateHexColor = () => {
  let hexCode = '#';
  const hexString = '0123456789abcdef';
  for (let i = 0; i < 6; i += 1) {
    const range = Math.floor(Math.random() * hexString.length);
    hexCode += hexString[range];
  }
  return hexCode;
};

export const generateLinearGradient = () => {
  const firstColor = generateHexColor();
  const secondColor = generateHexColor();
  const result = `linear-gradient(90deg, ${firstColor}, ${secondColor})`;
  return result;
};
