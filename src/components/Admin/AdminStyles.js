import styled from 'styled-components';

export const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
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

export const Button = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
export const ButtonTable = styled.button`
font-family : Tahoma;
font-size : 14px;
background : none;
border : none;
box-shadow : none;

`;

export const Table = styled.table`
  width: 100%;
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

export const TableCell = styled.td``;