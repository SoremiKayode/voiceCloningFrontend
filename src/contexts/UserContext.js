import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile');
        const userData = response.data;
        
        if (userData && Object.keys(userData).length > 0) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // If there's no data, store dummy data for testing purposes
          const dummyData = {
            id: 1,
            name: 'Dummy User',
            email: 'dummyuser@example.com',
          };
          setUser(dummyData);
          localStorage.setItem('user', JSON.stringify(dummyData));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // On error, also use dummy data
        const dummyData = {
          id: 1,
          name: 'Dummy User',
          email: 'dummyuser@example.com',
        };
        setUser(dummyData);
        localStorage.setItem('user', JSON.stringify(dummyData));
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
