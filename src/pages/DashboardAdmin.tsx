import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import {
  LogOut,
  Package,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  User,
  Star
} from 'lucide-react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus, updatePaymentStatus } = useOrder();
  // const [selectedTab, setSelectedTab] = useState<'orders' | 'stats'>('orders');

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'assigned': return 'Ditugaskan';
      case 'in_progress': return 'Diproses';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    let partnerName = '';
    if (newStatus === 'assigned') {
      partnerName = 'Mitra Express Jakarta';
    }
    updateOrderStatus(orderId, newStatus as any, 'partner-1', partnerName);

    // Auto update payment status when assigned
    if (newStatus === 'assigned') {
      updatePaymentStatus(orderId, 'paid');
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    inProgressOrders: orders.filter(o => ['assigned', 'in_progress'].includes(o.status)).length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + (o.price * 0.2), 0),
    averageRating: orders.filter(o => o.review).length > 0
      ? (orders.filter(o => o.review).reduce((sum, o) => sum + (o.review?.rating || 0), 0) / orders.filter(o => o.review).length).toFixed(1)
      : '0.0'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Kostmate Admin</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div data-aos="fade-up" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Kelola pesanan dan pantau performa platform Kostmate
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="400" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating Rata-rata</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div data-aos="fade-up" data-aos-delay="500" className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-6 text-white mb-8">
          <h3 className="text-lg font-semibold mb-2">Total Pendapatan</h3>
          <p className="text-3xl font-bold">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
          <p className="text-blue-100 mt-2">Dari {orders.filter(o => o.paymentStatus === 'paid').length} pesanan yang dibayar</p>
        </div>

        {/* Orders Management */}
        <div data-aos="fade-up" data-aos-delay="600" className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Kelola Pesanan</h2>
            <p className="text-gray-600 mt-1">Ubah status pesanan dan assign mitra</p>
          </div>

          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada pesanan</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{order.service}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.paymentStatus === 'paid' ? 'Dibayar' : 'Belum Dibayar'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{order.details}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(order.date).toLocaleDateString('id-ID')} - {order.time}</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 mt-0.5" />
                              <span>{order.address}</span>
                            </div>
                          </div>
                          {order.partnerName && (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span><strong>Mitra:</strong> {order.partnerName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+62 812-3456-7890</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-green-600">
                          Rp {order.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {order.id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Ubah Status
                          </label>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">Menunggu</option>
                            <option value="assigned">Tugaskan Mitra</option>
                            <option value="in_progress">Sedang Diproses</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Batalkan</option>
                          </select>
                        </div>
                      </div>

                      {order.review && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{order.review.rating}/5</span>
                          <span className="text-gray-500">"{order.review.comment}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;