import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Mock attendance data
        setAttendance([
          { date: '2026-06-25', status: 'present' },
          { date: '2026-06-24', status: 'present' },
          { date: '2026-06-23', status: 'absent' },
          { date: '2026-06-22', status: 'late' }
        ]);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{record.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        record.status === 'present'
                          ? 'bg-green-500'
                          : record.status === 'absent'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;