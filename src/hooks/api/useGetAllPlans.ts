import useAsync from "../use-async";

import * as plansApi from "../../services/plans-api";

export default function useGetAllPlans() {
  const {
    data: plans,
    loading: getPlansLoading,
    error: getPlansError,
    act: getPlans,
  } = useAsync(plansApi.getAllPlans, false);

  return {
    plans,
    getPlansLoading,
    getPlansError,
    getPlans,
  };
}
