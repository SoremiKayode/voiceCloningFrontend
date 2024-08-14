import React from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';
import {useTheme} from '../../contexts/ThemeContext';


const Login = () => {
  const {theme} = useTheme();
  return (
    <Container theme={theme}>
      <FormWrapper theme={theme}>
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
