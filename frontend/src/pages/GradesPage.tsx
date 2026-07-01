import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const GradesPage: React.FC = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Mock grades data
        setGrades([
          { courseName: 'Data Structures', marks: 85, grade: 'A', credits: 3 },
          { courseName: 'Algorithms', marks: 78, grade: 'B+', credits: 4 },
          { courseName: 'Database Systems', marks: 92, grade: 'A+', credits: 3 },
          { courseName: 'Web Development', marks: 88, grade: 'A', credits: 4 }
        ]);
      } catch (error) {
        console.error('Error fetching grades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Grades</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Course Name</th>
                <th className="px-6 py-3 text-left">Marks</th>
                <th className="px-6 py-3 text-left">Grade</th>
                <th className="px-6 py-3 text-left">Credits</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{grade.courseName}</td>
                  <td className="px-6 py-3">{grade.marks}/100</td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-6 py-3">{grade.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;