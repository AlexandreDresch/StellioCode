import useAsync from "../use-async";

import * as paymentsApi from "../../services/payments-api";

export default function useGetPaymentByIdClient() {
  const {
    data: payment,
    loading: getPaymentLoading,
    error: getPaymentError,
    act: getPaymentByIdClient,
  } = useAsync(paymentsApi.getPaymentByIdClient, false);

  return {
    payment,
    getPaymentLoading,
    getPaymentError,
    getPaymentByIdClient,
  };
}
