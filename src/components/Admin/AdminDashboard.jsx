// AdminDashboard.js
import React, { useState } from 'react';
import { AdminContainer, Sidebar, Content, Button } from './AdminStyles';
import UserTable from './UserTable';
import AudioTable from './AudioTable';
import { sanitizeUserInput } from '../../utils/userSanitization';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [formData, setFormData] = useState({ email: '', phoneNumber: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = sanitizeUserInput(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/signup', formData);
        toast.success('User added successfully!');
        setFormData({ email: '', phoneNumber: '', password: '' });
      } catch (error) {
        toast.error('Failed to add user.');
      }
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <ul>
          <li onClick={() => setActiveTab('users')}>Dashboard</li>
          <li onClick={() => setActiveTab('audio')}>Audio Files</li>
          <li onClick={() => setActiveTab('addUser')}>Add User</li>
        </ul>
      </Sidebar>
      <Content>
        {activeTab === 'users' && <UserTable />}
        {activeTab === 'audio' && <AudioTable />}
        {activeTab === 'addUser' && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <Button type="submit">Add User</Button>
          </form>
        )}
      </Content>
      <ToastContainer />
    </AdminContainer>
  );
};

export default AdminDashboard;
