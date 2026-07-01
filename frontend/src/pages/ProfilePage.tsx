import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">First Name</label>
              <p className="text-gray-600">{user?.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <p className="text-gray-600">{user?.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Role</label>
              <p className="text-gray-600 capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Phone</label>
              <p className="text-gray-600">{user?.phone || 'Not provided'}</p>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;