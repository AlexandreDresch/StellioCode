import useAsync from "../use-async";
import * as paymentsApi from "../../services/payments-api";

export default function useGetPaymentById({
  userType,
}: {
  userType: "client" | "developer";
}) {
  const {
    data: payment,
    loading: getPaymentLoading,
    error: getPaymentError,
    act: getPaymentById,
  } = useAsync(paymentsApi.getPaymentById, false);

  return {
    payment,
    getPaymentLoading,
    getPaymentError,
    getPaymentById: (userId: string, projectId: string, token?: string) =>
      getPaymentById({ userId, projectId, token, userType }),
  };
}
