/**
 * Bangladeshi Taka (৳ / BDT) Currency Formatter
 */
export function formatBDT(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳0';
  }
  
  if (Number.isInteger(amount)) {
    return `৳${amount.toLocaleString('en-IN')}`;
  }

  return `৳${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPrice(amount: number): string {
  return formatBDT(amount);
}
