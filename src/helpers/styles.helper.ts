const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const numberToHsl = (num: number): string => {
  const h = num % 360;
  const s = 60 + (num % 30);
  const l = 50 + (num % 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const stringToGradient = (input: string): string => {
  const hash1 = hashCode(input);
  const hash2 = hashCode(input + "salt");
  const hash3 = hashCode(input + "extra");

  const color1 = numberToHsl(hash1);
  const color2 = numberToHsl(hash2);
  const color3 = numberToHsl(hash3);

  const direction = (hash1 % 360) + "deg";

  return `linear-gradient(${direction}, ${color1}, ${color2}, ${color3})`;
};
