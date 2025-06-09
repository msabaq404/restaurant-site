export default function currencyToNumber(currency: string): number {
  // Remove any non-numeric characters except for the decimal point
  const numericString = currency.replace(/[^0-9.-]+/g, '');
  
  // Convert the cleaned string to a number
  const numberValue = parseFloat(numericString);
  
  // Check if the conversion was successful
  if (isNaN(numberValue)) {
    throw new Error('Invalid currency format');
  }
  
  return numberValue;
}