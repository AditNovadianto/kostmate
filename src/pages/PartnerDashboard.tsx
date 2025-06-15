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
    Star,
    DollarSign,
    TrendingUp,
    AlertCircle,
} from 'lucide-react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const PartnerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { orders, updateOrderStatus } = useOrder();
    // const [selectedTab, setSelectedTab] = useState<'orders' | 'stats'>('orders');

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    if (!user || user.role !== 'partner') {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Filter orders assigned to this partner
    const partnerOrders = orders.filter(order =>
        order.partnerId === 'partner-1' || order.status === 'assigned'
    );

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
            case 'in_progress': return 'Sedang Dikerjakan';
            case 'completed': return 'Selesai';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateOrderStatus(orderId, newStatus as any, 'partner-1', 'Mitra Express Jakarta');
    };

    const stats = {
        totalOrders: partnerOrders.length,
        assignedOrders: partnerOrders.filter(o => o.status === 'assigned').length,
        inProgressOrders: partnerOrders.filter(o => o.status === 'in_progress').length,
        completedOrders: partnerOrders.filter(o => o.status === 'completed').length,
        totalEarnings: partnerOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.price * 0.8), 0), // 80% commission
        averageRating: partnerOrders.filter(o => o.review).length > 0
            ? (partnerOrders.filter(o => o.review).reduce((sum, o) => sum + (o.review?.rating || 0), 0) / partnerOrders.filter(o => o.review).length).toFixed(1)
            : '0.0'
    };

    const todayOrders = partnerOrders.filter(order => {
        const orderDate = new Date(order.date);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
    });

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
                            <span className="ml-2 text-xl font-bold text-gray-900">Kostmate Partner</span>
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
                        Dashboard Mitra
                    </h1>
                    <p className="text-gray-600">
                        Kelola pesanan layanan dan pantau performa Anda
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
                                <p className="text-sm font-medium text-gray-600">Perlu Dikerjakan</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.assignedOrders}</p>
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

                {/* Earnings Card */}
                <div data-aos="fade-up" data-aos-delay="500" className="bg-gradient-to-r from-green-600 to-blue-500 rounded-xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Total Pendapatan</h3>
                            <p className="text-3xl font-bold">Rp {stats.totalEarnings.toLocaleString('id-ID')}</p>
                            <p className="text-green-100 mt-2">Dari {stats.completedOrders} pesanan selesai (komisi 80%)</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <DollarSign className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Today's Orders */}
                {todayOrders.length > 0 && (
                    <div data-aos="fade-up" data-aos-delay="600" className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                Pesanan Hari Ini ({todayOrders.length})
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {todayOrders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium text-gray-900">{order.service}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{order.time}</p>
                                        <p className="text-sm font-medium text-green-600">
                                            Rp {(order.price * 0.8).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Management */}
                <div data-aos="fade-up" data-aos-delay="700" className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Kelola Pesanan</h2>
                        <p className="text-gray-600 mt-1">Update status pesanan yang ditugaskan kepada Anda</p>
                    </div>

                    <div className="p-6">
                        {partnerOrders.length === 0 ? (
                            <div className="text-center py-8">
                                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Belum ada pesanan yang ditugaskan</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {partnerOrders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="font-medium text-gray-900">{order.service}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {getStatusText(order.status)}
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
                                                    <div className="space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="w-4 h-4" />
                                                            <span>+62 812-3456-7890</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <User className="w-4 h-4" />
                                                            <span>Customer ID: {order.userId}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="font-semibold text-green-600">
                                                    Rp {order.price.toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Komisi: Rp {(order.price * 0.8).toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ID: {order.id.slice(-6).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center space-x-4">
                                                {(order.status === 'assigned' || order.status === 'in_progress') && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Update Status
                                                        </label>
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="assigned">Ditugaskan</option>
                                                            <option value="in_progress">Mulai Kerjakan</option>
                                                            <option value="completed">Selesai</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                {order.review && (
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span>{order.review.rating}/5</span>
                                                        <span className="text-gray-500">"{order.review.comment}"</span>
                                                    </div>
                                                )}

                                                {order.status === 'completed' && (
                                                    <div className="flex items-center space-x-1 text-sm text-green-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Selesai</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Performance Insights */}
                <div data-aos="fade-up" className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Performa Bulan Ini
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Pesanan Selesai</span>
                                <span className="font-semibold">{stats.completedOrders}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Rating Rata-rata</span>
                                <span className="font-semibold">{stats.averageRating}/5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Pendapatan</span>
                                <span className="font-semibold text-green-600">
                                    Rp {stats.totalEarnings.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Tips untuk Mitra
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <p>Selalu update status pesanan secara real-time</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <p>Komunikasi yang baik dengan customer meningkatkan rating</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <p>Selesaikan pesanan tepat waktu untuk mendapat lebih banyak order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;