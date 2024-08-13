import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const FormWrapper = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
