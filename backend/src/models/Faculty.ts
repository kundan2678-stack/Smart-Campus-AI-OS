import { Schema, model, Document } from 'mongoose';

export interface IFaculty extends Document {
  userId: string;
  employeeId: string;
  department: string;
  specialization: string;
  classes: string[];
  experience: number;
  qualifications: string[];
  officeHours?: string;
  createdAt: Date;
  updatedAt: Date;
}

const facultySchema = new Schema<IFaculty>({
  userId: { type: String, required: true, ref: 'User' },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  specialization: { type: String, required: true },
  classes: [String],
  experience: { type: Number, required: true },
  qualifications: [String],
  officeHours: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Faculty = model<IFaculty>('Faculty', facultySchema);