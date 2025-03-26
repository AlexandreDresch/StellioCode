import { useContext } from "react";

import UserContext from "@/context/user-context";

export default function useUserId() {
  const userContext = useContext(UserContext);
  const id = userContext ? userContext.userData?.id : null;

  return id;
}
