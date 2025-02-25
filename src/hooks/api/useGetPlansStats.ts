import useAsync from "../use-async";

import * as plansApi from "../../services/plans-api";

export default function useGetPlansStats() {
  const {
    data: plansStats,
    loading: getPlansStatsLoading,
    error: getPlansStatsError,
    act: getPlansStats,
  } = useAsync(plansApi.getPlansStats, false);

  return {
    plansStats,
    getPlansStatsLoading,
    getPlansStatsError,
    getPlansStats,
  };
}