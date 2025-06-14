import React, { createContext, useContext, useState } from 'react';

export interface Order {
  id: string;
  userId: string;
  service: string;
  details: string;
  address: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  partnerId?: string;
  partnerName?: string;
  price: number;
  paymentStatus: 'pending' | 'paid';
  createdAt: string;
  review?: {
    rating: number;
    comment: string;
  };
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'status' | 'paymentStatus' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status'], partnerId?: string, partnerName?: string) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  addReview: (orderId: string, rating: number, comment: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (orderData: Omit<Order, 'id' | 'status' | 'paymentStatus' | 'createdAt'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setOrders(prev => [...prev, newOrder]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], partnerId?: string, partnerName?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, partnerId, partnerName }
        : order
    ));
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus: status }
        : order
    ));
  };

  const addReview = (orderId: string, rating: number, comment: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, review: { rating, comment } }
        : order
    ));
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      updatePaymentStatus,
      addReview,
      getOrderById,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};