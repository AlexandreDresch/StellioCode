import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserData {
  id: string;
  fullName: string;
  status?: string;
  role?: string;
  token?: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  logout: () => {},
});

export default UserContext;

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(() => {
    try {
      const storedUser = localStorage.getItem("userData");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erro ao recuperar usuário do localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}
