import React from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';

const Signup = () => {
  return (
    <Container>
      <FormWrapper>
        <h2>Sign Up</h2>
        <form>
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Phone Number" />
          <Input type="password" placeholder="Password" />
          <Button>Sign Up</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
