import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const PortalAuthContext = createContext(null);

const STORAGE_KEY = 'zuari_demo_portal_session';


const readSession = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);
  } catch {
    return null;
  }
};


export function PortalAuthProvider({ children }) {
  const [session, setSession] = useState(readSession);


  const login = (user) => {
    const nextSession = {
      user,
      demo: true,
      loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nextSession)
    );

    setSession(nextSession);
  };


  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  };


  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      isAuthenticated: Boolean(session?.user),
      login,
      logout,
    }),
    [session]
  );


  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}


export const usePortalAuth = () => {
  const context = useContext(PortalAuthContext);

  if (!context) {
    throw new Error(
      'usePortalAuth must be used inside PortalAuthProvider'
    );
  }

  return context;
};