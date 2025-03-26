import useAsync from "../use-async";

import * as servicesApi from "../../services/services-api";

export default function useGetServicesStats() {
  const {
    data: servicesStats,
    loading: getServicesStatsLoading,
    error: getServicesStatsError,
    act: getServicesStats,
  } = useAsync(servicesApi.getServicesStats, false);

  return {
    servicesStats,
    getServicesStatsLoading,
    getServicesStatsError,
    getServicesStats,
  };
}
