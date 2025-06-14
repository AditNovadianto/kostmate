import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  CheckCircle, 
  User, 
  Calendar,
  MapPin,
  Phone,
  Star,
  AlertCircle
} from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getUserOrders } = useOrder();
  const [highlightOrderId, setHighlightOrderId] = useState<string | null>(null);

  useEffect(() => {
    const highlight = searchParams.get('highlight');
    if (highlight) {
      setHighlightOrderId(highlight);
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightOrderId(null), 3000);
    }
  }, [searchParams]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const userOrders = getUserOrders(user.id).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu Konfirmasi';
      case 'assigned': return 'Mitra Ditugaskan';
      case 'in_progress': return 'Sedang Diproses';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'assigned': return <User className="w-5 h-5" />;
      case 'in_progress': return <Package className="w-5 h-5" />;
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'cancelled': return <AlertCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending': return 'Pesanan Anda sedang menunggu konfirmasi dari admin';
      case 'assigned': return 'Mitra layanan telah ditugaskan untuk pesanan Anda';
      case 'in_progress': return 'Mitra sedang mengerjakan layanan Anda';
      case 'completed': return 'Layanan telah selesai dikerjakan';
      case 'cancelled': return 'Pesanan telah dibatalkan';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Kostmate</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lacak Pesanan</h1>
          <p className="text-gray-600">Pantau status pesanan layanan Anda</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-600 mb-6">Anda belum memiliki pesanan layanan</p>
            <button
              onClick={() => navigate('/book-service')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Pesan Layanan Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div 
                key={order.id} 
                className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-300 ${
                  highlightOrderId === order.id 
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
                    : 'border-gray-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.service}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{order.details}</p>
                    <p className="text-sm text-gray-500">{getStatusDescription(order.status)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      Rp {order.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {order.id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(order.date).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} - {order.time}
                      </span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>{order.address}</span>
                    </div>
                  </div>

                  {order.partnerName && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span><strong>Mitra:</strong> {order.partnerName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>+62 812-3456-7890</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Status Pembayaran:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'Dibayar' : 'Menunggu Pembayaran'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {order.status === 'completed' && !order.review && (
                      <button
                        onClick={() => navigate(`/review/${order.id}`)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Star className="w-4 h-4" />
                        <span>Beri Review</span>
                      </button>
                    )}
                    
                    {order.review && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{order.review.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>

                {order.review && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Review Anda:</strong> {order.review.comment}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;