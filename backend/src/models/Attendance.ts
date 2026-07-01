import { Schema, model, Document } from 'mongoose';

export interface IAttendance extends Document {
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  timestamp: Date;
  detectedVia: 'face-recognition' | 'manual';
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>({
  studentId: { type: String, required: true, ref: 'Student' },
  classId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
  timestamp: { type: Date, default: Date.now },
  detectedVia: { type: String, enum: ['face-recognition', 'manual'], default: 'manual' },
  confidence: { type: Number, min: 0, max: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

attendanceSchema.index({ studentId: 1, classId: 1, date: 1 });

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);