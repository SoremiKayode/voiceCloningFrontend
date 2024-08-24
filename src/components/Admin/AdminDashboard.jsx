import React, { useState, useEffect } from 'react';
import { AdminContainer, Sidebar, Content, Button } from './AdminStyles';
import UserTable from './UserTable';
import AudioTable from './AudioTable';
import { sanitizeUserInput } from '../../utils/userSanitization';
import axios from 'axios';
import { showErrorNotification, showSuccessNotification } from '../../utils/Notification';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [formData, setFormData] = useState({ email: '', phoneNumber: '', password: '', isAdmin: false });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userdata'));
        const response = axios.get('http://127.0.0.1:8080/api/all-profiles', {
          headers: { 'Authorization': `Token ${token}` },
          params : userData,
        });
        setUsers(response.data);
        showSuccessNotification(`${response.data[0]}`)
      } catch (error) {
        showErrorNotification('Failed to fetch users.');
      }
    };
  
    const fetchAudios = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userdata'));
        const response = axios.get('http://127.0.0.1:8080/api/all-audio', {
          headers: { 'Authorization': `Token ${token}` },
          params: userData,
        });
        setAudios(response.data);
        showSuccessNotification(`${response.data[0]}`)
      } catch (error) {
        showErrorNotification('Failed to fetch audio files.');
      }
    };
  

      fetchUsers();
      fetchAudios();

  }, []);
  

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
        const response = await axios.post('http://127.0.0.1:8080/api/signup', formData);
        showSuccessNotification('User added successfully!');
        setFormData({ email: '', phoneNumber: '', password: '', isAdmin: false });
        setUsers([...users, response.data]);
      } catch (error) {
        showErrorNotification('Failed to add user.');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/delete-user/${userId}`);
      showSuccessNotification('User deleted successfully!');
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
     showErrorNotification('Failed to delete user.');
    }
  };

  const handleDeleteAudio = async (audioId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/delete-audio/${audioId}`);
      showSuccessNotification('Audio deleted successfully!');
      setAudios(audios.filter((audio) => audio._id !== audioId));
    } catch (error) {
      showErrorNotification('Failed to delete audio.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: '',
      isAdmin: user.isAdmin,
    });
    setActiveTab('addUser');
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
        {activeTab === 'users' && <UserTable users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser} />}
        {activeTab === 'audio' && <AudioTable audios={audios} onDeleteAudio={handleDeleteAudio} />}
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
            <div>
              <label>Admin:</label>
              <select
                name="isAdmin"
                value={formData.isAdmin}
                onChange={handleInputChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <Button type="submit">{editingUser ? 'Update User' : 'Add User'}</Button>
          </form>
        )}
      </Content>
    </AdminContainer>
  );
};

export default AdminDashboard;




