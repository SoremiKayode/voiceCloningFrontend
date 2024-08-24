import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return <ToastContainer />;
};

export const showErrorNotification = (message) => {
  toast.error(message, {
    position: 'top-right', // Use a string literal instead
    autoClose: 3000, // Close after 3 seconds
  });
};

export const showSuccessNotification = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',

    style: {
      fontSize: '18px',
      padding: '20px',
      borderRadius: '10px',
    },
  });
};

export default Notification;