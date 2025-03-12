import useAsync from "../use-async";

import * as lastSixMonthsStatsApi from "../../services/projects-api";

export default function useGetLastSixMonthsStats() {
  const {
    data: projectStats,
    loading: getProjectStatsLoading,
    error: getProjectStatsError,
    act: getLastSixMonthsStats,
  } = useAsync(lastSixMonthsStatsApi.getLastSixMonthsStats, false);

  return {
    projectStats,
    getProjectStatsLoading,
    getProjectStatsError,
    getLastSixMonthsStats,
  };
}