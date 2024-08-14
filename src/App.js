import React from 'react';
import HomePage from './components/Home/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import EditUser from './components/Admin/EditUser';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext'; // Adjust the path as needed
import Layout from './components/Layout';
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<EditUser />} />
      </Routes>
      </Layout>
    </Router>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
