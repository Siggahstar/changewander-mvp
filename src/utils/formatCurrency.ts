export function formatCurrency(value: number | null | undefined) {
  if (value == null) return '—';
  return `$${(value / 100).toFixed(2)}`;
}

export default formatCurrency;
