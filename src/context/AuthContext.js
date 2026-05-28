import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smarthire-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('smarthire-token') || null;
  });

  function login(userData, authToken) {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('smarthire-user',  JSON.stringify(userData));
    localStorage.setItem('smarthire-token', authToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smarthire-user');
    localStorage.removeItem('smarthire-token');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;