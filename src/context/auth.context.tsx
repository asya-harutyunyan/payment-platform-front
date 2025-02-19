import { User } from "@/common/types";
import { useAppDispatch } from "@/store";
import { fetchUser } from "@/store/reducers/auth/authSlice/thunks";
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
  fetchAuthUser?: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUser())
        .unwrap()
        .then((user) => {
          if (user) {
            setUser(user);
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
      const user = await dispatch(fetchUser()).unwrap();
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
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
