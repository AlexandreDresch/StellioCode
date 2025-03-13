import useAsync from "../use-async";

import * as plansApi from "../../services/plans-api";

export default function useCreatePlan() {
  const {
    data: plan,
    loading: createPlanLoading,
    error: createPlanError,
    act: addPlan,
  } = useAsync(plansApi.addPlan, false);

  return {
    plan,
    createPlanLoading,
    createPlanError,
    addPlan,
  };
}
