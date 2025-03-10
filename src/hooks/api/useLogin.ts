import useAsync from "../use-async";

import * as loginApi from "../../services/login-api";

export default function useLogin() {
  const {
    loading: useLoginLoading,
    error: useLoginError,
    data: userData,
    act: login,
  } = useAsync(loginApi.login, false);

  return {
    useLoginLoading,
    useLoginError,
    userData,
    login,
  };
}
