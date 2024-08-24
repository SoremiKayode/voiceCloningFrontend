import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userdata')) || null);

  useEffect(() => {
    const validateUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('userdata'));

      if (storedUser) {
        try {
          const response = await axios.get('/profile', {storedUser});
          const userData = response.data;

          if (JSON.stringify(userData) === JSON.stringify(storedUser)) {
            alert("they match");
            setUser(userData);
          } else {
            // logout(); // Data mismatch, log out the user
          }
        } catch (error) {
          console.error('Error validating user:', error);
          // logout(); // Error during validation, log out the user
        }
      }
    };

    validateUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userdata', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userdata');
  };

  return (
    <UserContext.Provider value={{ user, login, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
