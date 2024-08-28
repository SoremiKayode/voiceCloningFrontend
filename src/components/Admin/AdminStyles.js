import styled from 'styled-components';

export const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #333;
  color: white;
  padding: 1rem;
  ul {
    list-style: none;
    padding: 0;
    li {
      margin: 1rem 0;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;

`;

export const ButtonTable = styled.button`
font-family : Tahoma;
font-size : 14px;
background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};
border : none;
padding : 10px;
box-shadow : none;
color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
cursor : pointer;

`;

export const Table = styled.table`
  width: 100%;
  overflow-y : scroll;
  border-collapse: collapse;
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const FormWrapper = styled.div`
  padding: 2rem; 6rem;
  background: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => (theme === 'light' ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : '0px 4px 12px rgba(255, 255, 255, 0.1)')};
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  margin-bottom: 4rem;
  margin-right: 4rem;
  margin-left: 4rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorLabel = styled.span`
display: block;
font-size: 1.5em;
`
export const TableCell = styled.td`
color : black;
`;

export const TableBox = styled.div`
  height : 300px;
  overflow-y : scroll;

`