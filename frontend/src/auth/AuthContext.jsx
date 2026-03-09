import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    // Mock creation of user object based on email
    const name = email.split('@')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const mockUser = {
      name: capitalizedName,
      email: email,
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      avatar: `https://ui-avatars.com/api/?name=${capitalizedName}&background=6366f1&color=fff`,
      role: "Member",
      joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    };

    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);