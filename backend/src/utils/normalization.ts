/**
 * Normalize company name: lowercase, trim, remove extra spaces
 */
export const normalizeCompany = (company: string): string => {
  return company.trim().toLowerCase();
};

/**
 * Normalize role name: lowercase, trim, remove extra spaces
 */
export const normalizeRole = (role: string): string => {
  return role.trim().toLowerCase();
};

/**
 * Map custom level names to standardized levels
 * Examples: "SDE2" -> "SDE2", "L4" -> "L4", "Senior Engineer" -> "Senior"
 */
export const normalizeLevel = (level: string): string => {
  const upper = level.toUpperCase().trim();
  
  // Direct mappings
  const levelMap: { [key: string]: string } = {
    'L3': 'L3',
    'L4': 'L4',
    'L5': 'L5',
    'SDE1': 'SDE1',
    'SDE2': 'SDE2',
    'SDE3': 'SDE3',
    'PM1': 'PM1',
    'PM2': 'PM2',
    'PM3': 'PM3',
    'SENIOR': 'Senior',
    'LEAD': 'Lead',
    'STAFF': 'Staff',
    'PRINCIPAL': 'Principal',
    'SENIOR ENGINEER': 'Senior',
    'LEAD ENGINEER': 'Lead',
    'STAFF ENGINEER': 'Staff',
    'PRINCIPAL ENGINEER': 'Principal',
  };
  
  return levelMap[upper] || level;
};

/**
 * Validate salary numbers are within reasonable ranges
 */
export const isValidSalaryRange = (salary: number): boolean => {
  // Assuming INR, valid range: 0 to 100 Cr (10 billion)
  return salary > 0 && salary <= 1_000_000_000;
};

/**
 * Format salary to Indian Rupees display format
 */
export const formatSalaryINR = (salary: number): string => {
  if (salary >= 10_000_000) {
    return (salary / 10_000_000).toFixed(1) + ' Cr';
  } else if (salary >= 100_000) {
    return (salary / 100_000).toFixed(1) + ' Lakh';
  } else {
    return '₹' + salary.toLocaleString('en-IN');
  }
};

/**
 * Generate hash for duplicate detection
 */
export const generateSalaryHash = (
  company: string,
  role: string,
  level: string,
  location: string,
  yoe: number
): string => {
  const combined = `${company}|${role}|${level}|${location}|${yoe}`;
  // Simple hash (in production, use crypto)
  return Buffer.from(combined).toString('base64');
};

/**
 * Calculate total compensation
 */
export const calculateTotalCompensation = (
  base: number,
  bonus: number = 0,
  stock: number = 0
): number => {
  return base + bonus + stock;
};
