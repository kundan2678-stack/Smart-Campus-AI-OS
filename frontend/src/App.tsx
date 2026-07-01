import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import AttendancePage from './pages/AttendancePage';
import GradesPage from './pages/GradesPage';
import AssignmentsPage from './pages/AssignmentsPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/faculty/*" element={<FacultyDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;