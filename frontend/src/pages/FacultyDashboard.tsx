import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './FacultyDashboard.css';

const FacultyDashboard: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [liveAttendance, setLiveAttendance] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, classesRes] = await Promise.all([
          axios.get(
            `http://localhost:3000/api/v1/faculty/${user?.id}/attendance-live`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            `http://localhost:3000/api/v1/faculty/${user?.id}/classes`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);
        setLiveAttendance(attendanceRes.data);
        setClasses(classesRes.data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && token) {
      fetchData();
    }
  }, [user?.id, token]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard - {user?.firstName}</h2>
      
      <div className="live-attendance">
        <h3>📊 Live Attendance</h3>
        <div className="attendance-details">
          <div className="detail-item">
            <span>Course:</span>
            <strong>{liveAttendance?.courseName}</strong>
          </div>
          <div className="detail-item">
            <span>Total Students:</span>
            <strong>{liveAttendance?.totalStudents}</strong>
          </div>
          <div className="detail-item">
            <span>Present:</span>
            <strong style={{ color: '#4caf50' }}>{liveAttendance?.presentStudents}</strong>
          </div>
          <div className="detail-item">
            <span>Absent:</span>
            <strong style={{ color: '#f44336' }}>{liveAttendance?.absentStudents}</strong>
          </div>
          <div className="detail-item">
            <span>Attendance %:</span>
            <strong>{liveAttendance?.attendancePercentage}%</strong>
          </div>
        </div>
      </div>

      <div className="classes-section">
        <h3>📚 My Classes</h3>
        <div className="classes-grid">
          {classes.map((cls: any, idx: number) => (
            <div key={idx} className="class-card">
              <h4>{cls.courseName}</h4>
              <p><strong>Semester:</strong> {cls.semester}</p>
              <p><strong>Students:</strong> {cls.students}</p>
              <p><strong>Schedule:</strong> {cls.schedule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;