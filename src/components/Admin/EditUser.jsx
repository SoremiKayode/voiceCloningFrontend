import React, { useState } from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';

const EditUser = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    // Update user logic here
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Edit User</h2>
        <form>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Button onClick={handleSave}>Save</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default EditUser;
