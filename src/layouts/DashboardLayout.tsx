import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar.tsx';

const DashboardLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;