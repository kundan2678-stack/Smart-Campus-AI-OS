import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
  userId: string;
  rollNumber: string;
  batch: number;
  semester: number;
  cgpa: number;
  attendance: number;
  totalCredits: number;
  completedCredits: number;
  studyScore: number;
  placementStatus: 'not-started' | 'in-progress' | 'placed' | 'not-placed';
  placementCompany?: string;
  placementSalary?: number;
  mentorId?: string;
  interests: string[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
  userId: { type: String, required: true, ref: 'User' },
  rollNumber: { type: String, required: true, unique: true },
  batch: { type: Number, required: true },
  semester: { type: Number, required: true },
  cgpa: { type: Number, default: 0 },
  attendance: { type: Number, default: 100 },
  totalCredits: { type: Number, default: 0 },
  completedCredits: { type: Number, default: 0 },
  studyScore: { type: Number, default: 0 },
  placementStatus: { type: String, enum: ['not-started', 'in-progress', 'placed', 'not-placed'], default: 'not-started' },
  placementCompany: String,
  placementSalary: Number,
  mentorId: String,
  interests: [String],
  skills: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Student = model<IStudent>('Student', studentSchema);