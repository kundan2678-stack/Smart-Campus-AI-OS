import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">🎓 Smart Campus</div>
        <div className="flex gap-6 items-center">
          <a href="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </a>
          <a href="/attendance" className="hover:text-gray-200 transition">
            Attendance
          </a>
          <a href="/grades" className="hover:text-gray-200 transition">
            Grades
          </a>
          <a href="/assignments" className="hover:text-gray-200 transition">
            Assignments
          </a>
          <a href="/profile" className="hover:text-gray-200 transition">
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;