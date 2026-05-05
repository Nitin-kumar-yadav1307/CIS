import { Schema, model, Document } from 'mongoose';

export interface SalaryDocument extends Document {
  company: string; // normalized lowercase
  companyOriginal: string;
  role: string; // normalized
  roleOriginal: string;
  level: string; // L3, L4, L5, SDE1, SDE2, etc.
  location: string;
  country: string;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  experience_years: number;
  confidence_score: number;
  source: 'ai_team' | 'user_submission';
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const salarySchema = new Schema<SalaryDocument>(
  {
    company: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    companyOriginal: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    roleOriginal: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ['L3', 'L4', 'L5', 'SDE1', 'SDE2', 'SDE3', 'PM1', 'PM2', 'PM3', 'Senior', 'Lead', 'Staff', 'Principal'],
      index: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    country: {
      type: String,
      required: true,
      default: 'India',
    },
    base_salary: {
      type: Number,
      required: true,
      min: 0,
    },
    bonus: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    total_compensation: {
      type: Number,
      required: true,
      min: 0,
    },
    experience_years: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    confidence_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    source: {
      type: String,
      enum: ['ai_team', 'user_submission'],
      default: 'ai_team',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Create compound index for faster queries
salarySchema.index({ company: 1, level: 1, location: 1 });
salarySchema.index({ total_compensation: -1 });

export const Salary = model<SalaryDocument>('Salary', salarySchema);
