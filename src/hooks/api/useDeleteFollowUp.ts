import useAsync from "../use-async";

import * as projectsApi from "../../services/projects-api";

export default function useDeleteFollowUp() {
  const {
    loading: deleteFollowUpLoading,
    error: deleteFollowUpError,
    act: deleteFollowUp,
  } = useAsync(projectsApi.deleteFollowUp, false);

  return {
    deleteFollowUpLoading,
    deleteFollowUpError,
    deleteFollowUp,
  };
}
