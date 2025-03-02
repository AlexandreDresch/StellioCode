import useAsync from "../use-async";

import * as plansApi from "../../services/plans-api";

export default function useDeletePlan() {
  const {
    loading: deletePlanLoading,
    error: deletePlanError,
    act: deletePlan,
  } = useAsync(plansApi.deletePlan, false);

  return {
    deletePlanLoading,
    deletePlanError,
    deletePlan,
  };
}
