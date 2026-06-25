import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Layout.css';

const Layout: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="layout">
      <header className="navbar">
        <div className="navbar-brand">
          <h1>🚀 Smart Campus AI OS</h1>
        </div>
        <nav className="navbar-nav">
          {user?.role === 'student' && (
            <>
              <Link to="/student">Dashboard</Link>
              <Link to="/ai-chat">AI Mentor</Link>
            </>
          )}
          {user?.role === 'faculty' && (
            <>
              <Link to="/faculty">Dashboard</Link>
              <Link to="/ai-chat">AI Assistant</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <Link to="/admin">Dashboard</Link>
              <Link to="/ai-chat">Analytics</Link>
            </>
          )}
        </nav>
        <div className="user-info">
          {user && <span>{user.firstName} ({user.role})</span>}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;