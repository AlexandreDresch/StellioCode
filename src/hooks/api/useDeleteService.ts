import useAsync from "../use-async";

import * as servicesApi from "../../services/services-api";

export default function useDeleteService() {
  const {
    loading: deleteServiceLoading,
    error: deleteServiceError,
    act: deleteService,
  } = useAsync(servicesApi.deleteService, false);

  return {
    deleteServiceLoading,
    deleteServiceError,
    deleteService,
  };
}
