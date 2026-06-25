import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/students/${user?.id}/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboard(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && token) {
      fetchDashboard();
    }
  }, [user?.id, token]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="student-dashboard">
      <h2>Welcome, {user?.firstName}! 👋</h2>
      
      <div className="metrics-grid">
        <div className="metric-card attendance">
          <h3>📊 Attendance</h3>
          <div className="metric-value">{dashboard?.attendance}%</div>
          <p className="metric-label">Overall Attendance</p>
        </div>
        
        <div className="metric-card gpa">
          <h3>🎓 GPA</h3>
          <div className="metric-value">{dashboard?.gpa}</div>
          <p className="metric-label">Current Semester</p>
        </div>
        
        <div className="metric-card study-score">
          <h3>📚 Study Score</h3>
          <div className="metric-value">{dashboard?.aiStudyScore}</div>
          <p className="metric-label">AI Score</p>
        </div>
        
        <div className="metric-card placement">
          <h3>💼 Placement Ready</h3>
          <div className="metric-value">{dashboard?.placementReadiness}%</div>
          <p className="metric-label">Placement Score</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3>📅 Today's Timetable</h3>
          {dashboard?.todayTimetable?.map((cls: any, idx: number) => (
            <div key={idx} className="timetable-item">
              <strong>{cls.courseName}</strong>
              <span>{cls.startTime} - {cls.endTime}</span>
              <span>Room: {cls.room}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>📝 Pending Assignments</h3>
          <p className="count-badge">{dashboard?.pendingAssignments} assignments</p>
        </div>

        <div className="card">
          <h3>📆 Upcoming Exams</h3>
          <p className="count-badge">{dashboard?.upcomingExams} exams</p>
        </div>

        <div className="card">
          <h3>📈 Weekly Productivity</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${dashboard?.weeklyProductivity}%` }}></div>
          </div>
          <span>{dashboard?.weeklyProductivity}%</span>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;