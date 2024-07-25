export const roundedNumberTwoDecimals = (number) => {
  const roundedNumber = Math.ceil(number * 100) / 100;
  return Number(roundedNumber.toFixed(2));
}
