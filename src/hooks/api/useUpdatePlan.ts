import useAsync from "../use-async";

import * as plansApi from "../../services/plans-api";

export default function useUpdatePlan() {
  const {
    data: updatedPlan,
    loading: updatePlanLoading,
    error: updatePlanError,
    act: updatePlan,
  } = useAsync(plansApi.editPlan, false);

  return {
    updatedPlan,
    updatePlanLoading,
    updatePlanError,
    updatePlan,
  };
}
