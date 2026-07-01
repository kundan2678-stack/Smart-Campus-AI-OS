import { Schema, model, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  classId: string;
  facultyId: string;
  dueDate: Date;
  totalPoints: number;
  submissions: {
    studentId: string;
    submittedAt: Date;
    fileUrl: string;
    grade?: number;
    feedback?: string;
    submittedStatus: 'submitted' | 'late' | 'not-submitted';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  classId: { type: String, required: true },
  facultyId: { type: String, required: true },
  dueDate: { type: Date, required: true },
  totalPoints: { type: Number, required: true },
  submissions: [
    {
      studentId: String,
      submittedAt: Date,
      fileUrl: String,
      grade: Number,
      feedback: String,
      submittedStatus: { type: String, enum: ['submitted', 'late', 'not-submitted'], default: 'not-submitted' }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

assignmentSchema.index({ classId: 1, dueDate: 1 });

export const Assignment = model<IAssignment>('Assignment', assignmentSchema);