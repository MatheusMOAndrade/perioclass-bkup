import { createContext, useEffect, useState, ReactNode } from "react";

import { useRouter } from "next/router";

const defaultProvider: any = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
};
import toast from "react-hot-toast";
import useLocalStorage from "@/hooks/useLocalStorage";

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<any>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  const getCurrentSession = () => {
    const token = window.sessionStorage.getItem("sessionToken");

    return token ?? "";
  };

  useEffect(() => {
    const initAuth = () => {
      const userToken = getCurrentSession();

      if (userToken) {
        setUser({ userToken: userToken });
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const values = {
    user,
    loading,
    setUser,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
