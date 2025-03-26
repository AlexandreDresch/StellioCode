import { useContext } from "react";
import UserContext from "@/context/user-context";

export default function useLogout() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useLogout must be used within a UserProvider.");
  }

  const { logout } = userContext;

  return logout;
}
