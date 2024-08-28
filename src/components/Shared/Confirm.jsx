import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, ConfirmBox } from './ConfirmStyles'; // You can define styles in this file
import { toast } from 'react-toastify';

const Confirm = () => {
  const { userId } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const confirmUser = async () => {
      try {
        await axios.post('http://127.0.0.1:8080/api/confirm/', { userId });
        setConfirmed(true);
      } catch (error) {
        toast.error('Failed to confirm user.');
      }
    };

    confirmUser();
  }, [userId]);

  return (
    <Container>
      {confirmed ? (
        <ConfirmBox>User confirmed</ConfirmBox>
      ) : (
        <p>Processing confirmation...</p>
      )}
    </Container>
  );
};

export default Confirm;
