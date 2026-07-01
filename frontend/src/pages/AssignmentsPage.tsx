import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Mock assignments data
        setAssignments([
          {
            title: 'Binary Search Tree Implementation',
            dueDate: '2026-07-05',
            status: 'pending',
            totalPoints: 100
          },
          {
            title: 'Graph Algorithms',
            dueDate: '2026-07-10',
            status: 'submitted',
            totalPoints: 100
          },
          {
            title: 'Dynamic Programming Problems',
            dueDate: '2026-07-15',
            status: 'not-submitted',
            totalPoints: 100
          }
        ]);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Assignments</h1>

        <div className="space-y-4">
          {assignments.map((assignment: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                  <p className="text-gray-600 mt-2">Due: {assignment.dueDate}</p>
                  <p className="text-gray-600">Total Points: {assignment.totalPoints}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-white font-semibold ${
                    assignment.status === 'submitted'
                      ? 'bg-green-500'
                      : assignment.status === 'pending'
                      ? 'bg-blue-500'
                      : 'bg-red-500'
                  }`}
                >
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;