import React, { useState, useContext, useEffect } from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from '../../utils/Notification';

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, storeUserData] = useState();


  useEffect(() => {
    const dataUser = localStorage.getItem("userinfo")
    if (dataUser === 'true') {
      navigate('/');
    }
  }, [navigate]);
  function storeDataInLocalStorage(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      alert(typeof data.email);
      localStorage.setItem(key, jsonData);
      console.log('Data stored successfully in localStorage');
    } catch (error) {
      console.error('Error storing data in localStorage:', error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Sanitize inputs
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      // Send login request
      axios.post('http://127.0.0.1:8080/api/login', {
        email: sanitizedEmail,
        password: sanitizedPassword
      }).then(res => {
              // Handle successful login
      storeDataInLocalStorage("userdata", res.data.user);
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('userinfo', 'true');
      if(!localStorage.getItem('userdata')) {
        storeDataInLocalStorage("userdata", res.data);
      } 
      showSuccessNotification("Successfully login into account");
      window.location.href = "/";
      
      }).catch(err => {
        showErrorNotification(`Login Error:  + ${err.message}`);
      });

    } catch (err) {
      showErrorNotification(`Error:  + ${err}`);
    }
  };

  return (
    <Container theme={theme}>
      <FormWrapper theme={theme} method="post">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required="true"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required="true"
          />
          <Button type="submit" />
          {error && <p>{error}</p>}
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
