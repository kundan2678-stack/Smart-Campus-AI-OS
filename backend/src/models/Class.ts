import { Schema, model, Document } from 'mongoose';

export interface IClass extends Document {
  courseCode: string;
  courseName: string;
  facultyId: string;
  semester: number;
  credits: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  students: string[];
  totalStudents: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClass>({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  facultyId: { type: String, required: true, ref: 'Faculty' },
  semester: { type: Number, required: true },
  credits: { type: Number, required: true },
  schedule: [
    {
      day: String,
      startTime: String,
      endTime: String,
      room: String
    }
  ],
  students: [String],
  totalStudents: { type: Number, default: 0 },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Class = model<IClass>('Class', classSchema);