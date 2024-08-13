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
export const Button = styled.button`
background-color : blue;
`;
