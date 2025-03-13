import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useGetDevelopersStats() {
  const {
    data: developersStats,
    loading: getDevelopersStatsLoading,
    error: getDevelopersStatsError,
    act: getDevelopersStats,
  } = useAsync(developersApi.getDevelopersStats, false);

  return {
    developersStats,
    getDevelopersStatsLoading,
    getDevelopersStatsError,
    getDevelopersStats,
  };
}
