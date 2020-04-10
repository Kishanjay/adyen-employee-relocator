/* eslint-disable no-bitwise */
/* eslint-disable no-bitwise */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

export const strToHashCode = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = Math.imul(31, h) + str.charCodeAt(i) | 0; }
  return h;
};

export const stringToRgb = (str: string) => {
  const hash = strToHashCode(str);
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;

  const rgb = `rgb(${r},${g},${b})`;
  return rgb;
};
