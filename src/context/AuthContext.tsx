import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin' | 'partner';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for demo
const dummyUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@kostmate.com',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 123, Jakarta',
    role: 'user',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Admin Kostmate',
    email: 'admin@kostmate.com',
    phone: '081234567891',
    address: 'Kantor Kostmate',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: '3',
    name: 'Mitra Laundry',
    email: 'partner@kostmate.com',
    phone: '081234567892',
    address: 'Laundry Express Jakarta',
    role: 'partner',
    password: 'partner123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kostmate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = dummyUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('kostmate_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'role'> & { password: string }): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      role: 'user'
    };
    
    // In real app, this would save to database
    dummyUsers.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('kostmate_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kostmate_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};