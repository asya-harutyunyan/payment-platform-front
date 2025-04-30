import { User } from "@/common/types";
import { Wallet } from "@/common/types/user";
import { useAppDispatch } from "@/store";
import { fetchUser } from "@/store/reducers/authSlice/thunks";
import * as React from "react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  wallet?: Wallet;
  setWallet: Dispatch<SetStateAction<Wallet | undefined>>;
  fetchAuthUser?: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User>();
  const [wallet, setWallet] = useState<Wallet>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUser())
        .unwrap()
        .then((data) => {
          if (data) {
            setUser({
              ...data.user,
              permissions: data.permissions,
            });
            setWallet(data.wallet);
          }
        });
    }
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!user);
    if (user) {
      localStorage.setItem("user_role", user?.role ?? "");
    }
  }, [user]);

  const fetchAuthUser = async () => {
    if (localStorage.getItem("accessToken")) {
      const data = await dispatch(fetchUser()).unwrap();
      setUser({
        ...data.user,
        permissions: data.permissions,
      });
      setWallet(data.wallet);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        wallet,
        setWallet,
        setUser,
        fetchAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
