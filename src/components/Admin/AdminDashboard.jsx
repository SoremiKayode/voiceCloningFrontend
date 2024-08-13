import React, { useState } from 'react';
import { AdminContainer, Sidebar, Content } from './AdminStyles';
import UserTable from './UserTable';
import AudioTable from './AudioTable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <AdminContainer>
      <Sidebar>
        <ul>
          <li onClick={() => setActiveTab('users')}>Dashboard</li>
          <li onClick={() => setActiveTab('audio')}>Audio Files</li>
        </ul>
      </Sidebar>
      <Content>
        {activeTab === 'users' ? <UserTable /> : <AudioTable />}
      </Content>
    </AdminContainer>
  );
};

export default AdminDashboard;
