export const LEVELS = ['L3', 'L4', 'L5', 'SDE1', 'SDE2', 'SDE3', 'PM1', 'PM2', 'PM3', 'Senior', 'Lead', 'Staff', 'Principal'] as const;

export const LEVEL_ORDER = {
  L3: 1,
  L4: 2,
  L5: 3,
  SDE1: 4,
  SDE2: 5,
  SDE3: 6,
  PM1: 7,
  PM2: 8,
  PM3: 9,
  Senior: 10,
  Lead: 11,
  Staff: 12,
  Principal: 13,
};

export const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') return value;
  
  if (value >= 10_000_000) {
    return '₹' + (value / 10_000_000).toFixed(1) + ' Cr';
  } else if (value >= 100_000) {
    return '₹' + (value / 100_000).toFixed(1) + ' L';
  } else {
    return '₹' + value.toLocaleString('en-IN');
  }
};

export const parseRawValue = (formattedValue: string): number => {
  if (!formattedValue) return 0;
  
  if (formattedValue.includes('Cr')) {
    return parseFloat(formattedValue.replace('₹', '').replace(' Cr', '')) * 10_000_000;
  } else if (formattedValue.includes('L')) {
    return parseFloat(formattedValue.replace('₹', '').replace(' L', '')) * 100_000;
  } else {
    return parseFloat(formattedValue.replace('₹', ''));
  }
};
