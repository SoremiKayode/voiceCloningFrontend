import React from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';

const Login = () => {
  return (
    <Container>
      <FormWrapper>
        <h2>Login</h2>
        <form>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
