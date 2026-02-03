import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ScanDetail from './pages/ScanDetail';
import BrandPreview from './pages/BrandPreview';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/scan/:id" element={<ScanDetail />} />
          <Route path="/brand" element={<BrandPreview />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
