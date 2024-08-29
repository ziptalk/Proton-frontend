export const formatAddress = (address: string | undefined): string => {
  if (!address) return '';
  // 앞 7자와 뒤 6자를 남기고 나머지 부분을 생략합니다.
  const prefix = address.slice(0, 7);
  const suffix = address.slice(-6);
  return `${prefix}...${suffix}`;
};
