import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ScanDetail from './pages/ScanDetail';
import BrandPreview from './pages/BrandPreview';

function App() {
  return (
    <ToastProvider>
      <Routes>
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
