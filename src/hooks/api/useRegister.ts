import useAsync from "../use-async";
import * as registerApi from "../../services/register-api";

export default function useRegister() {
  const {
    loading: useRegisterLoading,
    error: useRegisterError,
    data: registerData,
    act: register,
  } = useAsync(registerApi.register, false);

  return {
    useRegisterLoading,
    useRegisterError,
    registerData,
    register,
  };
}
