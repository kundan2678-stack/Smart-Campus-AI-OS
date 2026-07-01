import { Schema, model, Document } from 'mongoose';

export interface IGrade extends Document {
  studentId: string;
  classId: string;
  courseCode: string;
  courseName: string;
  facultyId: string;
  semester: number;
  marks: number;
  totalMarks: number;
  grade: string;
  gradePoints: number;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

const gradeSchema = new Schema<IGrade>({
  studentId: { type: String, required: true, ref: 'Student' },
  classId: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  facultyId: { type: String, required: true },
  semester: { type: Number, required: true },
  marks: { type: Number, required: true },
  totalMarks: { type: Number, default: 100 },
  grade: { type: String, required: true },
  gradePoints: { type: Number, required: true },
  credits: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

gradeSchema.index({ studentId: 1, semester: 1 });

export const Grade = model<IGrade>('Grade', gradeSchema);