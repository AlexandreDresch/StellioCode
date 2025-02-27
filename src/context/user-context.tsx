import { createContext, ReactNode } from "react";
import useLocalStorage from "@/hooks/auth/use-local-storage";

interface UserData {
  id: number;
  fullName: string;
  status: string;
  role: string;
  token: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export default UserContext;

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useLocalStorage<UserData | null>(
    "userData",
    null
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}