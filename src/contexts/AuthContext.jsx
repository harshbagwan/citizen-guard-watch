import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    username: 'citizen1',
    role: 'citizen',
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    id: '2',
    username: 'officer1',
    role: 'police',
    name: 'Officer Smith',
    email: 'smith@cyberpolice.gov'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Mock authentication - in real app, this would be API call
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'demo') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}