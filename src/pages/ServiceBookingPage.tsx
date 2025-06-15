import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ServiceBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createOrder } = useOrder();

  const [formData, setFormData] = useState({
    service: '',
    details: '',
    address: user?.address || '',
    date: '',
    time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const services = [
    { id: 'laundry', name: 'Express Laundry', price: 15000, description: 'Cuci, kering, dan lipat' },
    { id: 'gallon', name: 'Gallon Delivery', price: 10000, description: 'Antar galon air minum' },
    { id: 'lamp', name: 'Lamp Replacement', price: 25000, description: 'Ganti lampu dan perbaikan listrik ringan' },
    { id: 'cleaning', name: 'Room Cleaning', price: 40000, description: 'Bersih-bersih kamar lengkap' },
    { id: 'shopping', name: 'Shopping Assistant', price: 20000, description: 'Belanja kebutuhan sehari-hari' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  const selectedService = services.find(s => s.id === formData.service);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderId = createOrder({
        userId: user.id,
        service: selectedService?.name || '',
        details: formData.details,
        address: formData.address,
        date: formData.date,
        time: formData.time,
        price: selectedService?.price || 0
      });

      // Simulate payment process
      setTimeout(() => {
        navigate(`/track-order?highlight=${orderId}`);
      }, 1000);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        <div data-aos="fade-up" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesan Layanan</h1>

          <p className="text-gray-600">Pilih layanan yang Anda butuhkan dan isi detail pesanan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Pilih Layanan
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${formData.service === service.id
                          ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={formData.service === service.id}
                          onChange={handleChange}
                          className="sr-only"
                        />

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>

                            <span className="text-sm font-medium text-green-600">
                              Rp {service.price.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                    Detail Layanan
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    required
                    value={formData.details}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Jelaskan detail kebutuhan Anda..."
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Alamat Lengkap
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={2}
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Alamat lengkap untuk pengambilan/pengantaran"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Tanggal
                    </label>

                    <div className="mt-1 relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />

                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Waktu
                    </label>

                    <div className="mt-1 relative">
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Pilih waktu</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>

                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Catatan Tambahan (Opsional)
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Catatan khusus untuk mitra layanan..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.service}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Memproses...' : 'Pesan Sekarang'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div data-aos="fade-up" data-aos-delay="200" className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>

              {selectedService ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedService.name}</h3>

                      <p className="text-sm text-gray-500">{selectedService.description}</p>
                    </div>

                    <span className="font-medium text-gray-900">
                      Rp {selectedService.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {formData.date && formData.time && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4" />

                        <span>{new Date(formData.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Clock className="w-4 h-4" />

                        <span>{formData.time}</span>
                      </div>

                      <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5" />

                        <span>{formData.address}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                      <span>Total</span>

                      <span>Rp {selectedService.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  {/* <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Pembayaran</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-800 mb-1">
                        <strong>Simulasi Pembayaran</strong>
                      </p>
                      <p className="text-xs text-blue-700">
                        Setelah menekan "Pesan Sekarang", status pembayaran akan otomatis berubah menjadi "Dibayar" untuk demo.
                      </p>
                    </div>
                  </div> */}
                </div>
              ) : (
                <p data-aos="fade-up" className="text-gray-500 text-center py-8">
                  Pilih layanan untuk melihat ringkasan pesanan
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingPage;