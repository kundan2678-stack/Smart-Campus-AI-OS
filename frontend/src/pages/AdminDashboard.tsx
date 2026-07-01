import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';

const AdminDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboard(response.data.dashboard);
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
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={dashboard?.totalStudents || '0'}
            icon="👥"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Total Faculty"
            value={dashboard?.totalFaculty || '0'}
            icon="👨‍🏫"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Total Classes"
            value={dashboard?.totalClasses || '0'}
            icon="📚"
            bgColor="bg-purple-100"
          />
          <StatCard
            title="Avg Attendance"
            value={`${dashboard?.averageAttendance || 0}%`}
            icon="📊"
            bgColor="bg-yellow-100"
          />
          <StatCard
            title="Placement Rate"
            value={`${dashboard?.placementRate || 0}%`}
            icon="💼"
            bgColor="bg-red-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Campus Overview</h2>
            <p className="text-gray-600">Real-time campus analytics</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>
            <p className="text-gray-600">Generate detailed reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;