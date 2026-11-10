import { Route, Routes } from "react-router-dom";
import '@/App.css';
import '@/styles/Navigation.css';
import '@/styles/Dashboard.css';
import '@/styles/FeaturePlaceholder.css';
import '@/styles/Inventory.css';
import '@/styles/Admin.css';
import '@/styles/AdminDashboard.css';
import '@/styles/AdminManagement.css';
import '@/styles/NotFound.css';

import { AuthProvider } from "@/contexts/AuthProvider.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import NotFound from '@/views/Public/NotFound';

import appRoutes from '@/config/appRoutes.tsx';
import RoleGuard from "./components/RoleGuard.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Routes>

        <Route element={<DashboardLayout />}>
          {appRoutes.map(({ path, roles, element }) => (
            <Route
              key={path}
              path={path}
              element={<RoleGuard roles={roles}>{element}</RoleGuard>}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
    </AuthProvider>
  );
};

export default App;