import useAsync from "../use-async";

import * as servicesApi from "../../services/services-api";

export default function useUpdateService() {
  const {
    data: updatedService,
    loading: updateServiceLoading,
    error: updateServiceError,
    act: updateService,
  } = useAsync(servicesApi.editService, false);

  return {
    updatedService,
    updateServiceLoading,
    updateServiceError,
    updateService,
  };
}
