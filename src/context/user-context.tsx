import { createContext, ReactNode } from "react";
import { toast } from "sonner";
import useLocalStorage from "@/hooks/auth/use-local-storage";

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

const UserContext = createContext<UserContextType | undefined>(undefined);
export default UserContext;

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useLocalStorage<UserData | null>(
    "userData",
    null,
  );

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
