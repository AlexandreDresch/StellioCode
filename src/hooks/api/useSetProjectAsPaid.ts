import useAsync from "../use-async";

import * as paymentsApi from "../../services/payments-api";

export default function useSetProjectAsPaid() {
  const {
    data: payment,
    loading: setPaymentLoading,
    error: setPaymentError,
    act: setProjectAsPaid,
  } = useAsync(paymentsApi.createProjectPayment, false);

  return {
    payment,
    setPaymentLoading,
    setPaymentError,
    setProjectAsPaid,
  };
}
