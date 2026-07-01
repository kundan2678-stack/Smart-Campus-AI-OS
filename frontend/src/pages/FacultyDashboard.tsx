import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';

const FacultyDashboard: React.FC = () => {
  const [faculty, setFaculty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/faculty/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaculty(response.data);
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
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Faculty Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Classes"
            value={faculty?.stats?.totalClasses || '0'}
            icon="📚"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Department"
            value={faculty?.stats?.department || 'N/A'}
            icon="🏢"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Experience"
            value={`${faculty?.stats?.experience || 0} yrs`}
            icon="👨‍🏫"
            bgColor="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Classes</h2>
            <p className="text-gray-600">Loading classes...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Submissions</h2>
            <p className="text-gray-600">No submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;