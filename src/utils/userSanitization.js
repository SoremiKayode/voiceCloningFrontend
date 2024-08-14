// userSanitization.js
export const sanitizeUserInput = ({ email, phoneNumber, password }) => {
    const errors = {};
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Invalid email address';
    }
  
    // Phone number validation
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must contain only numbers';
    }
  
    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      errors.password = 'Password must contain at least 8 characters, including uppercase and lowercase letters';
    }
  
    return errors;
  };
  