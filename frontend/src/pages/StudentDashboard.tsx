import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';

const StudentDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboard(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Attendance"
            value={`${dashboard?.stats?.attendance || 0}%`}
            icon="📊"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="CGPA"
            value={dashboard?.stats?.cgpa || '0.00'}
            icon="🎓"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Study Score"
            value={dashboard?.stats?.studyScore || '0'}
            icon="📈"
            bgColor="bg-purple-100"
          />
          <StatCard
            title="Placement Status"
            value={dashboard?.stats?.placementStatus || 'Not Started'}
            icon="💼"
            bgColor="bg-orange-100"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;