import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReviewPage from './pages/ReviewPage';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import NotFound from './pages/NotFound';
import PartnerDashboard from './pages/partnerDashboard';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/book-service" element={<ServiceBookingPage />} />
              <Route path="/track-order" element={<OrderTrackingPage />} />
              <Route path="/review/:orderId" element={<ReviewPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/partner" element={<PartnerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;