import React, { useState, useEffect } from 'react';
import { AdminContainer, Sidebar,
  FormWrapper, Input, Button, ErrorLabel, Content
   } from './AdminStyles';
import UserTable from './UserTable';
import AudioTable from './AudioTable';
import { sanitizeUserInput } from '../../utils/userSanitization';
import axios from 'axios';
import { showErrorNotification, showSuccessNotification } from '../../utils/Notification';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { theme } = useTheme();
  const history = useNavigate();


  useEffect(() => {
    const fetchUsers = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userdata'));
        axios.get('https://api.naynobo.site/api/all-profiles', {
          headers: { 'Authorization': `Token ${token}` },
          params : userData,
        }).then(response => {
          setUsers(response.data);
          showSuccessNotification(`successfully fetched Data`)
        }).catch(error => {
        showErrorNotification(`Failed to fetch users ${error.message}.`);
        });

      } catch (error) {
        showErrorNotification('Failed to fetch users.');
      }
    };
  
    const fetchAudios = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userdata'));
        axios.get('https://api.naynobo.site/api/all-audio', {
          headers: { 'Authorization': `Token ${token}` },
          params: userData,
        }).then(response => {
          setAudios(response.data);
          alert(response.data[0].name);
          showSuccessNotification(`Successully Fetch Audio files`);
        }).catch(error => {
        showErrorNotification('Failed to fetch audio files.');
        });

      } catch (error) {
        showErrorNotification('Failed to fetch audio files.');
      }
    };
  

      fetchUsers();
      fetchAudios();

  }, []);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete('https://api.naynobo.site/api/deleteuser', {
        params: {
            id: userId
        }
    })
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        showSuccessNotification('User deleted successfully!');
      }).catch((error) => {
      showErrorNotification(`Failed to delete user. ${error}`);
      });
      
    } catch (error) {
      showErrorNotification('Failed to delete user.');
    }
  };
  

  const handleDeleteAudio = async (audioId) => {
    try {
      await axios.delete(`https://api.naynobo.site/api/deleteaudio`, {
        params: {
            id: audioId
        }
    }).then(response => {
      showSuccessNotification('Audio deleted successfully!');
      setAudios(audios.filter((audio) => audio.id !== audioId));
    }).catch(err => {
      showErrorNotification(`Error deleting audio ${err}`);
    });

    } catch (error) {
      showErrorNotification('Failed to delete audio.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = sanitizeUserInput({
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const submitForm = new FormData();
      submitForm.append("full_name",  formData.fullName);
      submitForm.append("email",  formData.email);
      submitForm.append("password",  formData.password);
      submitForm.append("phone_number",  formData.phoneNumber);

      await axios.post('https://api.naynobo.site/api/signup', submitForm).then((response) => {
        showSuccessNotification("user successful login, will now redirect to home page");
        history('/admin');
      }).catch((error) => {
        showErrorNotification(`Error: ' + ${error}`);
      });

    } catch (error) {
      showErrorNotification('Error signing up. Please try again.');
    }
  };

  return (
    <AdminContainer theme={theme}>
      <Sidebar>
        <ul>
          <li onClick={() => setActiveTab('users')}>Dashboard</li>
          <li onClick={() => setActiveTab('audio')}>Audio Files</li>
          <li onClick={() => setActiveTab('addUser')}>Add User</li>
        </ul>
      </Sidebar>
      <Content>
        {activeTab === 'users' && <UserTable users={users} onDeleteUser={handleDeleteUser} theme={theme} />}
        {activeTab === 'audio' && <AudioTable audios={audios} onDeleteAudio={handleDeleteAudio} />}
        {activeTab === 'addUser' && (
     <FormWrapper theme={theme}>
     <h2>Sign Up</h2>
     <form onSubmit={handleSubmit} method='post'>
       <Input
         type="text"
         name="fullName"
         placeholder="Full Name"
         value={formData.fullName}
         onChange={handleChange}
       />
       {errors.fullName && <ErrorLabel>{errors.fullName}</ErrorLabel>}

       <Input
         type="email"
         name="email"
         placeholder="Email"
         value={formData.email}
         onChange={handleChange}
       />
       {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}

       <Input
         type="text"
         name="phoneNumber"
         placeholder="Phone Number"
         value={formData.phoneNumber}
         onChange={handleChange}
       />
       {errors.phoneNumber && <ErrorLabel>{errors.phoneNumber}</ErrorLabel>}

       <Input
         type="password"
         name="password"
         placeholder="Password"
         value={formData.password}
         onChange={handleChange}
       />
       {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}

       <Button type="submit" />
     </form>
   </FormWrapper>
        )}
      </Content>
    </AdminContainer>
  );
};

export default AdminDashboard;




