import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [dashboard, setDashboard] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, analyticsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/v1/admin/analytics?metric=attendance', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDashboard(dashRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h2>👨‍💼 Admin Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h4>👥 Total Students</h4>
          <div className="stat-value">{dashboard?.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h4>👨‍🏫 Total Faculty</h4>
          <div className="stat-value">{dashboard?.totalFaculty}</div>
        </div>
        <div className="stat-card">
          <h4>🏢 Active Students</h4>
          <div className="stat-value">{dashboard?.activeStudents}</div>
        </div>
        <div className="stat-card">
          <h4>📊 Avg Attendance</h4>
          <div className="stat-value">{dashboard?.averageAttendance}%</div>
        </div>
        <div className="stat-card">
          <h4>💼 Placement Rate</h4>
          <div className="stat-value">{dashboard?.placementRate}%</div>
        </div>
        <div className="stat-card">
          <h4>💰 Avg Package</h4>
          <div className="stat-value">{dashboard?.avgPackage} LPA</div>
        </div>
      </div>

      <div className="campus-occupancy">
        <h3>🏫 Campus Occupancy</h3>
        <div className="occupancy-grid">
          <div className="occupancy-item">
            <span>Classrooms</span>
            <div className="occupancy-bar">
              <div className="occupancy-fill" style={{ width: `${dashboard?.campusOccupancy?.classrooms}%` }}></div>
            </div>
            <span className="percentage">{dashboard?.campusOccupancy?.classrooms}%</span>
          </div>
          <div className="occupancy-item">
            <span>Labs</span>
            <div className="occupancy-bar">
              <div className="occupancy-fill" style={{ width: `${dashboard?.campusOccupancy?.labs}%` }}></div>
            </div>
            <span className="percentage">{dashboard?.campusOccupancy?.labs}%</span>
          </div>
          <div className="occupancy-item">
            <span>Library</span>
            <div className="occupancy-bar">
              <div className="occupancy-fill" style={{ width: `${dashboard?.campusOccupancy?.library}%` }}></div>
            </div>
            <span className="percentage">{dashboard?.campusOccupancy?.library}%</span>
          </div>
          <div className="occupancy-item">
            <span>Hostel</span>
            <div className="occupancy-bar">
              <div className="occupancy-fill" style={{ width: `${dashboard?.campusOccupancy?.hostel}%` }}></div>
            </div>
            <span className="percentage">{dashboard?.campusOccupancy?.hostel}%</span>
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <h3>⚠️ System Alerts</h3>
        {dashboard?.alerts?.map((alert: any, idx: number) => (
          <div key={idx} className={`alert alert-${alert.severity}`}>
            <strong>{alert.type}:</strong> {alert.count} issues
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;