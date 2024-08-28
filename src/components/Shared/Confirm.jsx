import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CenterLoader from './CenterLoader';

const Confirm = () => {
  const { email } = useParams();
  const location = useLocation();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const confirmUser = async () => {
      let emailFromUrl = email || location.search.split('email=')[1];

      while (!emailFromUrl) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay before retrying
        emailFromUrl = location.search.split('email=')[1];
      }

      try {
        await axios.post('http://127.0.0.1:8080/api/confirm', { email: emailFromUrl });
        setConfirmed(true);
        toast.success('User confirmed successfully!');
      } catch (error) {
        toast.error('Failed to confirm user.');
      }
    };

    confirmUser();
  }, [email, location]);

  return confirmed ? <CenterLoader text="User Confirmed" /> : <div><CenterLoader text="Confirming User ...." /></div>;
};

export default Confirm;
