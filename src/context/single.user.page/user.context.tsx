import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserContextType = {
  id: number | string;
  setId: Dispatch<SetStateAction<number | string>>;
  goToUserPage: (id: number | string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [id, setId] = useState<string | number>(0);

  const goToUserPage = (userId: number | string) => {
    if (userId) {
      navigate({ to: `/user-list/${userId}` });
    }
  };

  return (
    <UserContext.Provider value={{ id, setId, goToUserPage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
