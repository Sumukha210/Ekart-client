export const calculateTotalPrice = (amount: number, discount: number) =>
  amount - amount * (discount / 100);
