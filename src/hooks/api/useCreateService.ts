import useAsync from "../use-async";

import * as servicesApi from "../../services/services-api";

export default function useCreateService() {
  const {
    data: service,
    loading: createServiceLoading,
    error: createServiceError,
    act: addService,
  } = useAsync(servicesApi.addService, false);

  return {
    service,
    createServiceLoading,
    createServiceError,
    addService,
  };
}
