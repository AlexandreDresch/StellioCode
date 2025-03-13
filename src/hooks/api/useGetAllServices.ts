import useAsync from "../use-async";

import * as servicesApi from "../../services/services-api";

export default function useGetAllServices() {
  const {
    data: services,
    loading: getServicesLoading,
    error: getServicesError,
    act: getAllServices,
  } = useAsync(servicesApi.getAllServices, false);

  return {
    services,
    getServicesLoading,
    getServicesError,
    getAllServices,
  };
}
