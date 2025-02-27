import { useContext } from "react";

import UserContext from "@/context/user-context";

export default function useUserName() {
  const userContext = useContext(UserContext);
  const name = userContext ? userContext.userData?.fullName : null;

  return name;
}