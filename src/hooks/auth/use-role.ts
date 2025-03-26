import { useContext } from "react";

import UserContext from "@/context/user-context";

export default function useRole() {
  const userContext = useContext(UserContext);
  const role = userContext ? userContext.userData?.role : null;

  return role;
}
