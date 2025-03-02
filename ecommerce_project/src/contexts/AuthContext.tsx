import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface AuthUser {
  email: string;
  id: string;
}

// Define the context type
interface AuthContextType {
  currentUser: AuthUser | null;
  session: null; // Changed to always be null since we removed Supabase
  loading: boolean;
  login: (email: string, password: string) => Promise<{
    error: Error | null;
    user: { email: string } | null;
  }>;
  logout: () => Promise<{ error: null }>;
  signup: (email: string, password: string) => Promise<{
    error: Error | null;
    user: { email: string } | null;
  }>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false); // Set initial loading to false
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<null>(null);

  // Mock login function for development
  const login = async (email: string, password: string) => {
    // For demo purposes, simulate successful login with any email/password
    if (email === 'admin@cpsc449.com') {
      const mockUser = {
        email: 'admin@cpsc449.com',
        id: 'admin-user-id',
      };
      setCurrentUser(mockUser);
      return { user: { email: 'admin@cpsc449.com' }, error: null };
    } else if (email) {
      const mockUser = {
        email: email,
        id: 'user-' + Math.random().toString(36).substr(2, 9),
      };
      setCurrentUser(mockUser);
      return { user: { email }, error: null };
    }
    
    return { 
      user: null, 
      error: new Error('Invalid login credentials')
    };
  };

  // Mock logout function
  const logout = async () => {
    setCurrentUser(null);
    return { error: null };
  };

  // Mock signup function
  const signup = async (email: string, password: string) => {
    // For demo purposes, simulate successful signup
    if (email) {
      const mockUser = {
        email: email,
        id: 'user-' + Math.random().toString(36).substr(2, 9),
      };
      setCurrentUser(mockUser);
      return { user: { email }, error: null };
    }
    
    return { 
      user: null, 
      error: new Error('Invalid signup information')
    };
  };

  // Initialize auth state
  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    session,
    loading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 