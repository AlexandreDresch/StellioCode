import useAsync from "../use-async";

import * as lastSixMonthsStats from "../../services/projects-api";

export default function useGetLastSixMonthsStats() {
  const {
    data: projectStats,
    loading: getProjectStatsLoading,
    error: getProjectStatsError,
    act: getLastSixMonthsStats,
  } = useAsync(lastSixMonthsStats.getLastSixMonthsStats, false);

  return {
    projectStats,
    getProjectStatsLoading,
    getProjectStatsError,
    getLastSixMonthsStats,
  };
}