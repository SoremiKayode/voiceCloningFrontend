import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, FormWrapper, Input, Button, ErrorLabel } from '../../AppStyles';
import { useTheme } from "../../contexts/ThemeContext";
import { sanitizeUserInput } from '../../utils/userSanitization';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from '../../utils/Notification';

const Signup = () => {
  const { theme } = useTheme();
  const [ userInfo, setUserInfo ] = useState(localStorage.getItem('userinfo'));
  const history = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
  const useDat = localStorage.getItem('userinfo');
  setUserInfo(useDat);
    if (userInfo === "true") {
      history('/');
    }
  }, [userInfo, setUserInfo, history]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        history('/login');
      }).catch((error) => {
        showErrorNotification(`Error: ' + ${error}`);
      });

    } catch (error) {
      showErrorNotification('Error signing up. Please try again.');
    }
  };

  return (
    <Container theme={theme}>
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
    </Container>
  );
};

export default Signup;
