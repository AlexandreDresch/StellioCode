import useAsync from "../use-async";

import * as paymentsApi from "../../services/payments-api";

export default function useCheckoutForProject() {
  const {
    data: projectPaymentUrl,
    loading: createProjectPaymentLoading,
    error: createProjectPaymentError,
    act: createProjectPayment,
  } = useAsync(paymentsApi.createCheckoutForProject, false);

  return {
    projectPaymentUrl,
    createProjectPaymentLoading,
    createProjectPaymentError,
    createProjectPayment,
  };
}
