import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { Salary } from './models/Salary';

dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config();

const SEED_DATA = [
  // Google - Bangalore
  {
    company: 'Google',
    companyOriginal: 'Google',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L3',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1200000,
    bonus: 200000,
    stock: 300000,
    experience_years: 2,
    confidence_score: 95,
  },
  {
    company: 'Google',
    companyOriginal: 'Google',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1500000,
    bonus: 300000,
    stock: 500000,
    experience_years: 5,
    confidence_score: 95,
  },
  {
    company: 'Google',
    companyOriginal: 'Google',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 2000000,
    bonus: 500000,
    stock: 1000000,
    experience_years: 8,
    confidence_score: 90,
  },

  // Microsoft - Bangalore
  {
    company: 'Microsoft',
    companyOriginal: 'Microsoft',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L3',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1100000,
    bonus: 180000,
    stock: 250000,
    experience_years: 2,
    confidence_score: 92,
  },
  {
    company: 'Microsoft',
    companyOriginal: 'Microsoft',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1400000,
    bonus: 280000,
    stock: 450000,
    experience_years: 5,
    confidence_score: 93,
  },

  // Amazon - Bangalore
  {
    company: 'Amazon',
    companyOriginal: 'Amazon',
    role: 'SDE',
    roleOriginal: 'SDE',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1600000,
    bonus: 320000,
    stock: 600000,
    experience_years: 5,
    confidence_score: 94,
  },
  {
    company: 'Amazon',
    companyOriginal: 'Amazon',
    role: 'SDE',
    roleOriginal: 'SDE',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 2100000,
    bonus: 600000,
    stock: 1200000,
    experience_years: 8,
    confidence_score: 91,
  },

  // Apple - Bangalore
  {
    company: 'Apple',
    companyOriginal: 'Apple',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1700000,
    bonus: 350000,
    stock: 700000,
    experience_years: 6,
    confidence_score: 88,
  },

  // Meta - Bangalore
  {
    company: 'Meta',
    companyOriginal: 'Meta',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1800000,
    bonus: 400000,
    stock: 800000,
    experience_years: 5,
    confidence_score: 92,
  },
  {
    company: 'Meta',
    companyOriginal: 'Meta',
    role: 'Product Manager',
    roleOriginal: 'Product Manager',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1900000,
    bonus: 500000,
    stock: 950000,
    experience_years: 7,
    confidence_score: 85,
  },

  // Flipkart - Bangalore
  {
    company: 'Flipkart',
    companyOriginal: 'Flipkart',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L3',
    location: 'Bangalore',
    country: 'India',
    base_salary: 900000,
    bonus: 150000,
    stock: 200000,
    experience_years: 2,
    confidence_score: 88,
  },
  {
    company: 'Flipkart',
    companyOriginal: 'Flipkart',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1300000,
    bonus: 250000,
    stock: 400000,
    experience_years: 5,
    confidence_score: 90,
  },

  // Uber - Bangalore
  {
    company: 'Uber',
    companyOriginal: 'Uber',
    role: 'Senior Software Engineer',
    roleOriginal: 'Senior Software Engineer',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 2200000,
    bonus: 600000,
    stock: 1300000,
    experience_years: 8,
    confidence_score: 89,
  },

  // Swiggy - Bangalore
  {
    company: 'Swiggy',
    companyOriginal: 'Swiggy',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1200000,
    bonus: 200000,
    stock: 350000,
    experience_years: 4,
    confidence_score: 87,
  },

  // Infosys - Bangalore
  {
    company: 'Infosys',
    companyOriginal: 'Infosys',
    role: 'Senior Software Engineer',
    roleOriginal: 'Senior Software Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 1000000,
    bonus: 150000,
    stock: 200000,
    experience_years: 6,
    confidence_score: 86,
  },

  // TCS - Bangalore
  {
    company: 'TCS',
    companyOriginal: 'TCS',
    role: 'Senior Systems Engineer',
    roleOriginal: 'Senior Systems Engineer',
    level: 'L4',
    location: 'Bangalore',
    country: 'India',
    base_salary: 950000,
    bonus: 120000,
    stock: 150000,
    experience_years: 7,
    confidence_score: 85,
  },

  // Accenture - Bangalore
  {
    company: 'Accenture',
    companyOriginal: 'Accenture',
    role: 'Senior Software Engineer',
    roleOriginal: 'Senior Software Engineer',
    level: 'L3',
    location: 'Bangalore',
    country: 'India',
    base_salary: 850000,
    bonus: 100000,
    stock: 100000,
    experience_years: 3,
    confidence_score: 84,
  },

  // Goldman Sachs - Bangalore
  {
    company: 'Goldman Sachs',
    companyOriginal: 'Goldman Sachs',
    role: 'Vice President',
    roleOriginal: 'Vice President',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 2500000,
    bonus: 1000000,
    stock: 1500000,
    experience_years: 10,
    confidence_score: 93,
  },

  // JPMorgan - Bangalore
  {
    company: 'JPMorgan',
    companyOriginal: 'JPMorgan',
    role: 'Vice President',
    roleOriginal: 'Vice President',
    level: 'L5',
    location: 'Bangalore',
    country: 'India',
    base_salary: 2400000,
    bonus: 900000,
    stock: 1400000,
    experience_years: 9,
    confidence_score: 92,
  },

  // US-based salaries for comparison
  {
    company: 'Google',
    companyOriginal: 'Google',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'US',
    country: 'United States',
    base_salary: 200000,
    bonus: 50000,
    stock: 150000,
    experience_years: 5,
    confidence_score: 96,
  },
  {
    company: 'Microsoft',
    companyOriginal: 'Microsoft',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'US',
    country: 'United States',
    base_salary: 195000,
    bonus: 45000,
    stock: 140000,
    experience_years: 5,
    confidence_score: 95,
  },
  {
    company: 'Amazon',
    companyOriginal: 'Amazon',
    role: 'SDE',
    roleOriginal: 'SDE',
    level: 'L4',
    location: 'US',
    country: 'United States',
    base_salary: 210000,
    bonus: 55000,
    stock: 160000,
    experience_years: 5,
    confidence_score: 96,
  },
  {
    company: 'Apple',
    companyOriginal: 'Apple',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'US',
    country: 'United States',
    base_salary: 205000,
    bonus: 50000,
    stock: 155000,
    experience_years: 5,
    confidence_score: 94,
  },
  {
    company: 'Meta',
    companyOriginal: 'Meta',
    role: 'Software Engineer',
    roleOriginal: 'Software Engineer',
    level: 'L4',
    location: 'US',
    country: 'United States',
    base_salary: 220000,
    bonus: 60000,
    stock: 180000,
    experience_years: 5,
    confidence_score: 95,
  },
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cis';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Salary.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Add source and verified fields
    const seedDataWithDefaults = SEED_DATA.map((data) => ({
      ...data,
      total_compensation: data.base_salary + (data.bonus || 0) + (data.stock || 0),
      source: 'ai_team' as const,
      verified: data.confidence_score >= 85,
    }));

    // Insert seed data
    const result = await Salary.insertMany(seedDataWithDefaults);
    console.log(`✅ Inserted ${result.length} salary entries`);

    // Get stats
    const counts = await Salary.countDocuments();
    console.log(`📊 Total salaries in database: ${counts}`);

    // Show sample of data
    const samples = await Salary.find().limit(3).lean();
    console.log('\n📋 Sample entries:');
    samples.forEach((s: any) => {
      console.log(
        `  - ${s.companyOriginal} ${s.roleOriginal} (${s.level}) in ${s.location}: ₹${s.total_compensation.toLocaleString()}`
      );
    });

    await mongoose.disconnect();
    console.log('\n✅ Seed complete!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedDatabase();
