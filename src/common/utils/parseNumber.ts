export const parseNumber = (numString: string): number => {
  // 쉼표 제거 후 숫자로 변환
  return parseFloat(numString.replace(/,/g, ''));
};
